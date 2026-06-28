import { FaBars, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminTopbar({ setSidebarOpen }) {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-md px-4 md:px-8 py-4 flex justify-between items-center">

      {/* Left Side */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-2xl text-gray-700"
        >
          <FaBars />
        </button>

        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <p className="text-sm md:text-base text-gray-500">
            Welcome back, {user?.name}
          </p>
        </div>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 md:gap-5">

        {/* Home Button */}
        <Link
          to="/"
          className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition"
        >
          <FaHome />
          Home
        </Link>

        {/* Avatar */}
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center text-lg md:text-xl font-bold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        {/* User Info */}
        <div className="hidden md:block">
          <h3 className="font-semibold">
            {user?.name}
          </h3>

          <p className="text-sm text-gray-500">
            Administrator
          </p>
        </div>

      </div>

    </header>
  );
}