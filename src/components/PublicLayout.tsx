import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PublicRoute() {
  const { data: user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (user) {
    return <Navigate to="/home" replace />; // already logged in → go to dashboard
  }

  return <Outlet />; // otherwise show public routes
}
