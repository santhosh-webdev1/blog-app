import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import api from '../../api/axios';
import { toast } from "react-toastify";

// ✅ Schema: Only name + email now
const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // ✅ Mutation using Axios
  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await api.post("/auth/register", data);
      return res.data;
    },
    onSuccess: () =>
      toast.success("✅ Registered successfully! Please check your email to set a password."),
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "❌ Registration failed, try a different email."
      );
    },
  });

  const onSubmit = (data: FormData) => mutation.mutate(data);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-purple-300 to-purple-200">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Create an Account
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <input
              {...register("name")}
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              {...register("email")}
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            disabled={mutation.isPending}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
          >
            {mutation.isPending ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Link to Login */}
        <p className="mt-6 text-center text-purple-600 font-medium">
          Already registered?{" "}
          <Link
            to="/login"
            className="font-bold underline hover:text-purple-800 transition-colors"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
