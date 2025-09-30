import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import CommentSection from "../../components/CommentSection";

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["postDetail", id],
    queryFn: async () => {
      const res = await api.get(`/posts/viewblog/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading post…
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-600">
        <p>Failed to load post</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 text-sm rounded-md border border-gray-300
                     text-gray-700 hover:bg-gray-100"
        >
          ← Back
        </button>
      </div>
    );
  }

  const { title, content, user, createdAt } = data;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-white">
      {/* Header */}
      <header className="mb-10 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500 mt-2">
          {user ? `By ${user.name}` : "Unknown author"} •{" "}
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </header>

      {/* Content */}
      <article className="prose max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap break-all">
        {content}
      </article>

      <CommentSection postId={id!} />

      {/* Back button */}
      <div className="mt-12">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 rounded-md border border-gray-300
                     text-gray-700 hover:bg-gray-100"
        >
          ← Back to Feed
        </button>
      </div>
    </div>
  );
}
