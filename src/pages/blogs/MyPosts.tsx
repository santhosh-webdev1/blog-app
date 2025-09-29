import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import MyPostCard from "../../components/MyPostCard";

export default function MyPosts() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["myPosts"],
    queryFn: async () => {
      const res = await api.get("/posts/myposts");
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center text-red-500 py-10">Failed to load posts.</div>;

  const posts = data || [];

  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-20">
      {posts.length === 0 ? (
        <div className="text-center text-gray-500 text-lg font-medium py-20">
          🚫 You haven’t posted anything yet!
        </div>
      ) : (
        <div className="w-full max-w-3xl space-y-6">
          {posts.map((post: any) => (
            <MyPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
