import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";

// ✅ Validation Schema
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // ✅ Login Mutation
  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      // endpoint where you set the httpOnly cookie in NestJS
      const res = await api.post("/auth/testlogin", data);
      return res.data; // { user: {...} } if you follow the controller we made
    },
    onSuccess: () => {
      alert("Login successfull");
      navigate("/");
    },
    onError: (err: any) => {
      alert(
        err.response?.data?.message || "❌ Login failed. Check credentials."
      );
    },
  });

  const onSubmit = (data: FormData) => mutation.mutate(data);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-purple-300 to-purple-200">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Welcome Back
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            disabled={mutation.isPending}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
          >
            {mutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Link to Register */}
        <p className="mt-6 text-center text-purple-600 font-medium">
          New user?{" "}
          <Link
            to="/register"
            className="font-bold underline hover:text-purple-800 transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
