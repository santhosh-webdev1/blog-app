export default function MyPostCard({ post, onEdit, onDelete }: { post: any; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow">
      <h2 className="text-2xl font-bold text-gray-900 mb-3 break-words">{post.title}</h2>
      <p className="text-gray-700 leading-relaxed break-words">{post.content}</p>
      <p className="mt-4 text-sm text-gray-500">
        Posted on {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={onEdit}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
