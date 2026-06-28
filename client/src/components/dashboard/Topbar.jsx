import { Link } from "react-router-dom";
import {
  FaHome,
  FaBars,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

export default function Topbar({
  setSidebarOpen,
}) {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow px-4 md:px-8 py-5 flex justify-between items-center">

      <div className="flex items-center gap-4">

        {/* Mobile Menu */}

        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden"
        >
          <FaBars size={24} />
        </button>

        <div>

          <h1 className="text-xl md:text-3xl font-bold">
            Welcome, {user?.name}
          </h1>

          <p className="text-gray-500 text-sm md:text-base">
            {user?.role === "admin"
              ? "Admin Dashboard"
              : "Volunteer Dashboard"}
          </p>

        </div>

      </div>

      <div className="flex items-center gap-3">

        <Link
          to="/"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 md:px-4 py-2 rounded-lg"
        >
          <FaHome />
          <span className="hidden sm:block">
            Home
          </span>
        </Link>

        <img
          src="https://i.pravatar.cc/50"
          alt="Profile"
          className="rounded-full w-10 h-10 md:w-12 md:h-12"
        />

      </div>

    </div>
  );
}