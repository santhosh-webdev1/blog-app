import { useMutation } from "@tanstack/react-query";
import { Link, Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-toastify";

export default function HomeLayout() {

  const navigate = useNavigate();

  // logout
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("auth/logout");
      return res.data;
    },

    onSuccess: () => {
      toast.success("Logged out Successfully");
      navigate("/login");
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message || " Logout failed")
    }
  })


  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Sidebar */}
      <aside
        className="w-72 bg-gradient-to-b from-purple-700 via-purple-800 to-indigo-800
                   text-white shadow-2xl flex flex-col p-6 rounded-r-3xl
                   border-r border-purple-500/20 backdrop-blur-md"
      >
        {/* Brand */}
        <div className="flex items-center justify-center mb-12">
          <h1 className="text-3xl font-extrabold tracking-wide drop-shadow-md">
            My<span className="text-purple-300">Blog</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          <NavItem to="/">Post Feed</NavItem>
          <NavItem to="create">Create Post</NavItem>
          <NavItem to="myposts">My Posts</NavItem>
          <NavItem to="profile">User Profile</NavItem>
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-purple-400/30">
          <button
            onClick={() => mutation.mutate()}
            className="w-full text-center py-2 px-4 rounded-xl font-semibold
             bg-purple-500/80 hover:bg-purple-400/90 active:scale-95
             transition-all duration-200 shadow-md"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 overflow-y-auto p-10
                   bg-gradient-to-br from-gray-100 to-gray-200
                   shadow-inner"
      >
        <Outlet /> {/* 👉 Child routes */}
      </main>
    </div>
  );
}

function NavItem({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `group flex items-center gap-3 px-4 py-3 rounded-xl font-medium
         transition-all duration-200
         ${isActive
          ? "bg-white/20 text-white shadow-lg ring-1 ring-white/30"
          : "text-purple-100 hover:bg-white/10 hover:text-purple-50"
        }`
      }
    >
      <span className="transition-transform group-hover:translate-x-1">
        {children}
      </span>
    </NavLink>
  );
}
