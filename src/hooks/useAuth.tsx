// src/hooks/useAuth.ts
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export function useAuth() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      try {
        const res = await api.get("/auth/me");
        return res.data;
      } catch (err: any) {
        if (err.response?.status === 401) {
          return null; // treat unauthorized as "no user"
        }
        throw err;
      }
    },
    retry: false,
  });
}