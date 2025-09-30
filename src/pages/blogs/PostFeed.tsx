import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import PostCard from "../../components/PostCard";

export default function PostFeed() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", page],
    queryFn: async () => {
      const res = await api.get(`/posts/feed?page=${page}&limit=${limit}`);
      return res.data; // expected: { data: Post[], meta: {...} }
    },
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading posts…
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        Failed to load posts
      </div>
    );
  }

  // ✅ safe destructure
  const posts = data.data ?? [];
  const meta = data.meta ?? { page: 1, totalPages: 1 };

  return (
    <div className="w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
      {/* Header */}
      <header className="mb-10 border-b border-gray-200 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Blogging Application
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Browse recent articles and updates from the community
          </p>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-20">
          No one has posted yet
        </div>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          style={{ gridAutoRows: "1fr" }}
        >
          {posts.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {posts.length > 0 && (
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40 transition"
          >
            ← Prev
          </button>

          <span className="text-gray-700">
            Page {meta.page} of {meta.totalPages}
          </span>

          <button
            disabled={page === meta.totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, meta.totalPages))}
            className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40 transition"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
