import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";

export default function Register() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {

    try {

      await api.post("/auth/register", data);

      toast.success("Registration Successful");

      navigate("/login");

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Registration Failed"
      );

    }

  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded-xl shadow-xl w-96"
      >

        <h1 className="text-3xl font-bold mb-8 text-center">
          Register
        </h1>

        <input
          {...register("name", {
            required: "Name Required",
          })}
          placeholder="Name"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          {...register("email", {
            required: "Email Required",
          })}
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          {...register("password", {
            required: "Password Required",
          })}
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
        />

        <button
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white p-3 rounded-lg"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-5">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}