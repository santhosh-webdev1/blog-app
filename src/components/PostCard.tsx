import { Link } from "react-router-dom";

interface Post {
  id: string | number;
  title: string;
  content: string;
  user?: { name?: string };
  createdAt?: string;
}

export default function PostCard({ post }: { post: Post }) {
  const contentPreview =
    post.content.split(/\s+/).slice(0, 80).join(" ") +
    (post.content.split(/\s+/).length > 80 ? "…" : "");

  return (
    // h-[380px] gives taller fixed height, flex layout keeps footer pinned
    <article
      className="h-[220px] flex flex-col bg-white border border-gray-200
                 rounded-xl shadow-sm p-6 hover:shadow-md transition"
      aria-labelledby={`post-title-${post.id}`}
    >
      {/* Title */}
      <header className="mb-4">
        <h2
          id={`post-title-${post.id}`}
          className="text-2xl font-semibold text-gray-900 line-clamp-2"
        >
          {post.title}
        </h2>
        {post.createdAt && (
          <p className="text-xs text-gray-400 mt-1">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        )}
      </header>

      {/* Content Preview – exactly 2 lines */}
      <div className="flex-1 mb-4 text-gray-700 leading-relaxed">
        <p className="text-lg line-clamp-2">{contentPreview}</p>
      </div>

      {/* Footer pinned at bottom */}
      <footer className="mt-auto flex items-center justify-between text-sm text-gray-500">
        <div>
          {post.user ? (
            <span>
              By <span className="font-medium text-gray-800">{post.user.name}</span>
            </span>
          ) : (
            <span>By Unknown</span>
          )}
        </div>

        <Link
          to={`/posts/${post.id}`}
          className="text-gray-700 hover:text-gray-900 font-medium"
        >
          Read more →
        </Link>
      </footer>
    </article>
  );
}
