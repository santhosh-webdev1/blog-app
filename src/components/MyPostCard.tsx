// src/components/MyPostCard.tsx
export default function MyPostCard({ post }: { post: any }) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-3 break-words">
        {post.title}
      </h2>

      {/* Content */}
      <p className="text-gray-700 leading-relaxed break-words">
        {post.content}
      </p>

      {/* Created At */}
      <p className="mt-4 text-sm text-gray-500">
        Posted on {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
