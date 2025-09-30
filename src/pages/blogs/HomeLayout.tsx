// src/pages/blogs/HomeLayout.tsx
import { Link, Outlet, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";


export default function HomeLayout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
  try {
    await api.post("/auth/logout");
    queryClient.removeQueries({ queryKey: ["auth"] }); // 🔥 clears cached user
    toast.success("Logged out successfully");
    navigate("/"); // back to public feed
  } catch (err) {
    toast.error("Logout failed");
  }
}; 

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-gray-800 to-gray-700 text-white flex flex-col justify-between">
        <div>
          <div className="p-6 text-2xl font-bold border-b border-gray-600">
            Dashboard
          </div>
          <nav className="flex flex-col p-4 gap-4">
            <Link to="/myposts" className="hover:text-gray-300">
              My Posts
            </Link>
            <Link to="/create" className="hover:text-gray-300">
              Create Post
            </Link>
            <Link to="/profile" className="hover:text-gray-300">
              Profile
            </Link>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="m-4 px-4 py-2 rounded bg-red-500 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
