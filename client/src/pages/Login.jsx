import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // Auto-fill demo admin credentials
  const fillAdminCredentials = () => {
    setValue("email", "admin@volunteerhub.com");
    setValue("password", "Admin@123");
  };

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", data);

      login(res.data.user, res.data.token);

      toast.success("Login Successful");

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100 px-4">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-center mb-8">
          Login
        </h1>

        {/* Demo Credentials */}

        <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-5 mb-6">

          <h2 className="text-lg font-bold text-emerald-700 mb-3">
            🎯 Demo Credentials
          </h2>

          <div className="space-y-2 text-sm text-gray-700">

            <p>
              <strong>Admin Email:</strong>
              <br />
              admin@volunteerhub.com
            </p>

            <p>
              <strong>Password:</strong>
              <br />
              Admin@123
            </p>

            <p className="text-gray-600 pt-2">
              Use the above credentials to explore the
              Admin Dashboard.
            </p>

            <p className="text-gray-600">
              Or create a new account to experience
              the Volunteer Dashboard.
            </p>

          </div>

          <button
            type="button"
            onClick={fillAdminCredentials}
            className="mt-5 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition"
          >
            Fill Admin Credentials
          </button>

        </div>

        {/* Email */}

        <input
          {...register("email", {
            required: "Email Required",
          })}
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-3"
        />

        {errors.email && (
          <p className="text-red-500 text-sm mb-3">
            {errors.email.message}
          </p>
        )}

        {/* Password */}

        <input
          type="password"
          {...register("password", {
            required: "Password Required",
          })}
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-3"
        />

        {errors.password && (
          <p className="text-red-500 text-sm mb-3">
            {errors.password.message}
          </p>
        )}

        {/* Login Button */}

        <button
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg transition"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        {/* Register */}

        <p className="text-center mt-6 text-gray-600">

          Don't have an account?

          <Link
            to="/register"
            className="ml-2 text-emerald-600 font-semibold hover:underline"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}