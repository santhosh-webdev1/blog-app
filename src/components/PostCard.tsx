import { useState } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
  user?: { name: string };
}

export default function PostCard({ post }: { post: Post }) {
  const [showComments, setShowComments] = useState(false);

  //  Truncate content to ~100 words
  const contentPreview = post.content
    .split(/\s+/)
    .slice(0, 100)
    .join(" ") + (post.content.split(/\s+/).length > 100 ? "…" : "");

  return (
    <div
      className="
        w-full max-w-full
        bg-white rounded-2xl shadow-md border border-gray-100
        p-6 md:p-8
        hover:shadow-lg hover:-translate-y-1
        transition-all duration-200
        overflow-hidden
      "
    >
      {/* Title */}
      <h2
        className="
          text-2xl font-semibold text-gray-800 mb-3
          break-words break-all whitespace-pre-wrap
        "
      >
        {post.title}
      </h2>

      {/* Content */}
      <p
        className="
          text-gray-700 leading-relaxed mb-6
          break-words break-all whitespace-pre-wrap
          overflow-hidden
        "
      >
        {contentPreview}
      </p>

      {/* Footer */}
      {post.user && (
        <div
          className="
            flex flex-col sm:flex-row sm:items-center sm:justify-between
            gap-4 text-sm
          "
        >
          <span className="text-gray-500">
            By{" "}
            <span className="font-medium text-purple-700">
              {post.user.name}
            </span>
          </span>

          <button
            onClick={() => setShowComments((prev) => !prev)}
            className="
              inline-flex items-center justify-center
              px-5 py-2 rounded-lg font-medium
              bg-gradient-to-r from-purple-600 to-indigo-600
              text-white shadow
              hover:from-purple-500 hover:to-indigo-500
              active:scale-95 transition-all duration-150
            "
          >
            {showComments ? "Hide Comments" : "Show Comments"}
          </button>
        </div>
      )}

      {/* Comments Section */}
      {showComments && (
        <div
          className="
            mt-6 pt-6 border-t border-gray-200 text-gray-600
            break-words break-all whitespace-pre-wrap
          "
        >
          <p className="italic">Comments coming soon…</p>
        </div>
      )}
    </div>
  );
}
