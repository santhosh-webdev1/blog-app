import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import PostCard from "../../components/PostCard";

export default function PostFeed() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", page],
    queryFn: async () => {
      const res = await api.get(`/posts/feed?page=${page}&limit=${limit}`);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-medium text-purple-700">
        Loading posts...
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-medium text-red-500">
        Failed to load posts
      </div>
    );

  const { data: posts, meta } = data;

  return (
    <div
      className="
        max-w-6xl w-full
        min-h-screen mx-auto
        px-4 sm:px-6 lg:px-8 py-12
        bg-gradient-to-br from-purple-50 via-white to-purple-50
        overflow-x-hidden break-words 
      "
    >
      {posts.length === 0 ? (
        <div className="text-center text-gray-500 text-xl font-semibold py-20">
           No one has posted yet!
        </div>
      ) : (
        <div className="grid gap-8 max-w-5xl mx-auto">
          {posts.map((post: any) => (
            <div
              key={post.id}
              className="
                bg-white rounded-2xl
                shadow-md hover:shadow-2xl
                p-8
                transition-all duration-300
                border border-gray-100
              "
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {posts.length > 0 && (
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="
              px-6 py-2 rounded-full border border-purple-600
              text-purple-600 font-medium
              hover:bg-purple-600 hover:text-white
              disabled:opacity-40
              disabled:hover:bg-transparent disabled:hover:text-purple-600
              transition
            "
          >
            ← Prev
          </button>

          <span className="text-gray-700 font-semibold">
            Page {meta.page} of {meta.totalPages}
          </span>

          <button
            disabled={page === meta.totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, meta.totalPages))}
            className="
              px-6 py-2 rounded-full border border-purple-600
              text-purple-600 font-medium
              hover:bg-purple-600 hover:text-white
              disabled:opacity-40
              disabled:hover:bg-transparent disabled:hover:text-purple-600
              transition
            "
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
