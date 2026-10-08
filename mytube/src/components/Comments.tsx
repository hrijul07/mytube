"use client";

import { useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Props {
  videoId: string;
}

interface Comment {
  _id: string;
  usercommented: string;
  commentbody: string;
  commentedon: string;
}

export default function Comments({ videoId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const loadComments = async () => {
    try {
      const res = await fetch(`${API_URL}/comment/${videoId}`);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setComments(data);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.error("Failed to load comments:", err);
      setComments([]);
    }
  };

  useEffect(() => {
    if (videoId) {
      loadComments();
    }
  }, [videoId]);

  const addComment = async () => {
    if (!text.trim()) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/comment/postcomment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          videoid: videoId,
          commentbody: text.trim(),
          language: "en",
          location: {
            visible: false,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to post comment.");
        return;
      }

      setText("");
      await loadComments();
    } catch (err) {
      console.error("Failed to post comment:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mt-8">
      <h2 className="text-2xl font-semibold mb-4">
        Comments ({comments.length})
      </h2>

      <div className="flex gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
              addComment();
            }
          }}
          placeholder="Add a comment..."
          disabled={loading}
          className="flex-1 rounded-lg bg-zinc-900 px-4 py-3 outline-none disabled:opacity-50"
        />

        <button
          onClick={addComment}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 px-6 rounded-lg transition"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {comments.length === 0 ? (
          <div className="text-gray-400 text-center py-8">
            No comments yet. Be the first to comment!
          </div>
        ) : (
          comments.map((c) => (
            <div
              key={c._id}
              className="bg-zinc-900 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold">
                  {c.usercommented}
                </p>

                {c.commentedon && (
                  <span className="text-xs text-gray-500">
                    {new Date(c.commentedon).toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-gray-300 mt-2 whitespace-pre-wrap">
                {c.commentbody}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}