import download from "../Modals/download.js";
import video from "../Modals/video.js";

// swap/extend this once the Razorpay Plan model exists - for now this is the
// single source of truth for how many downloads each plan allows per day.
// "gold" is treated as effectively unlimited.
const DOWNLOAD_LIMITS = {
  free: 1,
  bronze: 3,
  silver: 7,
  gold: Infinity,
};

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export const handledownload = async (req, res) => {
  const userid = req.user._id;
  const plan = req.user.plan || "free";
  const { videoId } = req.params;

  try {
    const videodoc = await video.findById(videoId);
    if (!videodoc) return res.status(404).json({ message: "Video not found" });

    const limit = DOWNLOAD_LIMITS[plan] ?? DOWNLOAD_LIMITS.free;
    const todayCount = await download.countDocuments({
      userid,
      downloadedon: { $gte: startOfToday() },
    });

    if (todayCount >= limit) {
      return res.status(403).json({
        message: `Daily download limit reached for your ${plan} plan (${limit}/day). Upgrade for more downloads.`,
        limit,
        used: todayCount,
      });
    }

    await download.create({
      userid,
      videoid: videoId,
      planAtDownload: plan,
    });

    return res.status(200).json({
      message: "Download authorized",
      filepath: videodoc.filepath,
      filename: videodoc.filename,
      remainingToday: limit === Infinity ? "unlimited" : limit - todayCount - 1,
    });
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getalldownloads = async (req, res) => {
  const userid = req.user._id;
  try {
    const downloads = await download
      .find({ userid })
      .populate({ path: "videoid", model: "videofiles" })
      .sort({ downloadedon: -1 });
    return res.status(200).json(downloads);
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getdownloadstatus = async (req, res) => {
  const userid = req.user._id;
  const plan = req.user.plan || "free";
  try {
    const limit = DOWNLOAD_LIMITS[plan] ?? DOWNLOAD_LIMITS.free;
    const todayCount = await download.countDocuments({
      userid,
      downloadedon: { $gte: startOfToday() },
    });
    return res.status(200).json({
      plan,
      limit: limit === Infinity ? "unlimited" : limit,
      used: todayCount,
      remaining: limit === Infinity ? "unlimited" : Math.max(limit - todayCount, 0),
    });
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};