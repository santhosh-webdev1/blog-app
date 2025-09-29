import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

export default function SetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = decodeURIComponent(searchParams.get("token") || "");
  const email = decodeURIComponent(searchParams.get("email") || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ 1) Verify Token
  const {
    data: isValid,      //  will be true / false
    isPending,
    isError
  } = useQuery({
    queryKey: ["verifyToken", token],
    queryFn: async () => {

      //ensure to not be null
      if (!token) throw new Error("Token is required");
      if (!email || !token) throw new Error("Email and token are required");

      // Backend expects token as query param
      const res = await api.post(
        `/auth/validate-token?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`
      );
      return res.data as boolean; // backend returns true/false
    },
    enabled: !!token
  });

  //  2) Submit Password
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/auth/set-password", {
        email,
        token,
        password
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Password set successfully!");
      navigate("/login");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || " Failed to set password");
    }
  });

  // Loading State
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-purple-300 to-purple-200">
        <p className="text-lg font-medium text-white">Verifying token...</p>
      </div>
    );
  }

  // Token Invalid
  if (isError || !isValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-purple-300 to-purple-200">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <p className="text-red-500 font-semibold text-lg">
            Token is invalid or expired.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Go to Register
          </button>
        </div>
      </div>
    );
  }

  // ✅ Token Valid → Show Password Form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-purple-300 to-purple-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-purple-700 text-center">
          Set Your Password
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:outline-purple-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:outline-purple-500"
          />

          <button
            onClick={() => {
              if (!password || !confirmPassword) {
                toast.error("Please fill in all fields");
                return;
              }
              if (password !== confirmPassword) {
                toast.error("Passwords do not match");
                return;
              }
              mutation.mutate();
            }}
            disabled={mutation.isPending}
            className="bg-purple-600 text-white rounded-lg p-3 font-medium hover:bg-purple-700 disabled:opacity-60"
          >
            {mutation.isPending ? "Saving..." : "Set Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
