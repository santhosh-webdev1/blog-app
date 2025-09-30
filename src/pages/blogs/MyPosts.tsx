import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";
import MyPostCard from "../../components/MyPostCard";
import { updatePost, deletePost } from "../../api/posts";

export default function MyPostPage() {
  const queryClient = useQueryClient();

  // Load user’s posts
  const { data, isLoading } = useQuery({
    queryKey: ["myposts"],
    queryFn: async () => {
      const res = await api.get("/posts/myposts");
      return res.data;
    },
  });

  // Mutation for update
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { title: string; content: string } }) =>
      updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myposts"] });
    },
  });

  // Mutation for delete
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myposts"] });
    },
  });

  if (isLoading) return <div>Loading…</div>;

  return (
    <div className="space-y-6">
      {data.map((post: any) => (
        <MyPostCard
          key={post.id}
          post={post}
          onEdit={() =>
            updateMutation.mutate({
              id: post.id,
              data: { title: "Updated Title", content: "Updated Content" }, // placeholder
            })
          }
          onDelete={() => deleteMutation.mutate(post.id)}
        />
      ))}
    </div>
  );
}
