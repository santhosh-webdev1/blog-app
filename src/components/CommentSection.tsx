import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios"; // axios instance with { withCredentials: true }

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user: { name: string };
}

export default function CommentSection({ postId }: { postId: string }) {
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState("");

  // 🔹 Fetch all comments for this post
  const { data: comments = [], isLoading } = useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await api.get(`/posts/${postId}/comments`);
      return res.data;
    },
  });

  // 🔹 Add a new comment (backend is protected by @UseGuards(AuthGuard('jwt')))
    const mutation = useMutation({
    mutationFn: async (content: string) =>
        api.post(`/posts/${postId}/comments`, { content }),
    onSuccess: () => {
        setNewComment("");
        queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    });

  if (isLoading) return <p className="text-gray-500">Loading comments…</p>;

  return (
    <div className="mt-12 border-t border-gray-200 pt-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Comments</h2>

      {/* Existing comments */}
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c.id}>
              <p className="text-gray-800 whitespace-pre-wrap break-words">
                {c.content}
              </p>
              <span className="text-xs text-gray-500">
                — {c.user?.name || "Anonymous"} ·{" "}
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Add comment form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!newComment.trim()) return;
          mutation.mutate(newComment);
        }}
        className="mt-6 flex gap-3"
      >
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 border rounded-lg p-3 text-sm text-gray-700
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Write a comment…"
          rows={2}
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg
                     hover:bg-purple-500 transition disabled:opacity-50"
        >
          Post
        </button>
      </form>
    </div>
  );
}
