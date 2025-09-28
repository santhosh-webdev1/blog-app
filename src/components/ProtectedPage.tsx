// src/components/ProtectedRoute.tsx
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import api from "../api/axios";

export default function ProtectedRoute() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await api.get("/auth/me"); // ✅ Cookie sent automatically
      return res.data; // user object
    },
    retry: false, // don't keep retrying if unauthorized
  });

  if (isLoading) return <div>Loading...</div>;

  // ❌ If request failed → user not logged in
  if (isError) return <Navigate to="/auth/login" replace />;

  // ✅ Authenticated → render child route
  return <Outlet context={data} />;
}
