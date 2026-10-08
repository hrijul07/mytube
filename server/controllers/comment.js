import comment from "../Modals/comment.js";
import mongoose from "mongoose";
import axios from "axios";
import leoProfanity from "leo-profanity";

leoProfanity.loadDictionary();

const SPAM_WINDOW_MS = 60 * 1000;
const SPAM_MAX_COMMENTS = 5;
const recentCommentCounts = new Map();

function hasRepeatedSpecialChars(text) {
  return /(.)\1{4,}/.test(text) || /[^a-zA-Z0-9\s]{5,}/.test(text);
}

function isSpamming(userid) {
  const now = Date.now();
  const entry = recentCommentCounts.get(userid) || { count: 0, windowStart: now };
  if (now - entry.windowStart > SPAM_WINDOW_MS) {
    entry.count = 0;
    entry.windowStart = now;
  }
  entry.count += 1;
  recentCommentCounts.set(userid, entry);
  return entry.count > SPAM_MAX_COMMENTS;
}

export const postcomment = async (req, res) => {
  const userid = req.user._id;
  const usercommented = req.user.name;
  const { videoid, commentbody, language, location } = req.body;

  if (!commentbody || !commentbody.trim()) {
    return res.status(400).json({ message: "Comment content is required" });
  }
  if (leoProfanity.check(commentbody)) {
    return res.status(400).json({ message: "Comment contains inappropriate language" });
  }
  if (hasRepeatedSpecialChars(commentbody)) {
    return res.status(400).json({ message: "Comment looks like spam (repeated special characters)" });
  }
  if (isSpamming(userid.toString())) {
    return res.status(429).json({ message: "You're posting too fast, please slow down" });
  }

  try {
    const postcomment = new comment({
      videoid,
      commentbody,
      language,
      location,
      userid,
      usercommented,
    });
    await postcomment.save();
    return res.status(200).json({ comment: true });
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getallcomment = async (req, res) => {
  const { videoid } = req.params;
  try {
    const commentvideo = await comment.find({
      videoid: videoid,
      status: { $ne: "removed" },
    });

    const sanitized = commentvideo.map((c) => {
      const obj = c.toObject();
      if (!obj.location?.visible) delete obj.location;
      return obj;
    });

    return res.status(200).json(sanitized);
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deletecomment = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("comment unavailable");
  }
  try {
    const commentdoc = await comment.findById(_id);
    if (!commentdoc) return res.status(404).send("comment unavailable");

    if (commentdoc.userid.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "You can only delete your own comments" });
    }

    await comment.findByIdAndDelete(_id);
    return res.status(200).json({ comment: true });
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const editcomment = async (req, res) => {
  const { id: _id } = req.params;
  const { commentbody } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("comment unavailable");
  }
  try {
    const commentdoc = await comment.findById(_id);
    if (!commentdoc) return res.status(404).send("comment unavailable");

    if (commentdoc.userid.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only edit your own comments" });
    }

    const updatecomment = await comment.findByIdAndUpdate(_id, {
      $set: { commentbody: commentbody },
    });
    res.status(200).json(updatecomment);
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const translatecomment = async (req, res) => {
  const { id: _id } = req.params;
  const { lang } = req.query;
  if (!lang) return res.status(400).json({ message: "Target language (lang) is required" });

  try {
    const commentdoc = await comment.findById(_id);
    if (!commentdoc) return res.status(404).json({ message: "Comment not found" });

    const cached = commentdoc.translations.find((t) => t.lang === lang);
    if (cached) return res.status(200).json({ translated: cached.text, cached: true });

    const { data } = await axios.post(
      process.env.TRANSLATE_API_URL || "https://libretranslate.com/translate",
      {
        q: commentdoc.commentbody,
        source: commentdoc.language || "auto",
        target: lang,
        format: "text",
      }
    );

    commentdoc.translations.push({ lang, text: data.translatedText, cachedAt: new Date() });
    await commentdoc.save();

    return res.status(200).json({ translated: data.translatedText, cached: false });
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Translation failed" });
  }
};

export const likecomment = async (req, res) => {
  await reactToComment(req, res, "likes");
};

export const dislikecomment = async (req, res) => {
  await reactToComment(req, res, "dislikes");
};

const reactToComment = async (req, res, field) => {
  const userId = req.user._id.toString();
  const { id: _id } = req.params;
  const otherField = field === "likes" ? "dislikes" : "likes";

  try {
    const commentdoc = await comment.findById(_id);
    if (!commentdoc) return res.status(404).json({ message: "Comment not found" });

    commentdoc[otherField] = commentdoc[otherField].filter((u) => u.toString() !== userId);
    const alreadyReacted = commentdoc[field].some((u) => u.toString() === userId);

    if (alreadyReacted) {
      commentdoc[field] = commentdoc[field].filter((u) => u.toString() !== userId);
    } else {
      commentdoc[field].push(userId);
    }

    await commentdoc.save();
    return res.status(200).json({ likes: commentdoc.likes.length, dislikes: commentdoc.dislikes.length });
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const REPORT_THRESHOLD = 3;

export const reportcomment = async (req, res) => {
  const userId = req.user._id.toString();
  const { reason } = req.body;
  const { id: _id } = req.params;

  try {
    const commentdoc = await comment.findById(_id);
    if (!commentdoc) return res.status(404).json({ message: "Comment not found" });

    const alreadyReported = commentdoc.reports.some((r) => r.userid.toString() === userId);
    if (alreadyReported) {
      return res.status(409).json({ message: "You already reported this comment" });
    }

    commentdoc.reports.push({ userid: userId, reason });

    if (commentdoc.reports.length >= REPORT_THRESHOLD && commentdoc.status === "active") {
      commentdoc.status = "under_review";
    }

    await commentdoc.save();
    return res.status(200).json({ message: "Comment reported", status: commentdoc.status });
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getflaggedcomments = async (req, res) => {
  try {
    const flagged = await comment.find({ status: "under_review" }).sort({ updatedAt: -1 });
    return res.status(200).json(flagged);
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updatecommentstatus = async (req, res) => {
  const { id: _id } = req.params;
  const { status } = req.body;
  if (!["active", "removed"].includes(status)) {
    return res.status(400).json({ message: "status must be 'active' or 'removed'" });
  }
  try {
    const updated = await comment.findByIdAndUpdate(_id, { $set: { status } }, { new: true });
    return res.status(200).json(updated);
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};