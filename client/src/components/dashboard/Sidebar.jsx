import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const { logout } = useAuth();

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-6 py-4 transition ${
      isActive
        ? "bg-emerald-900"
        : "hover:bg-emerald-800"
    }`;

  return (
    <>
      {/* Overlay */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed lg:static
          top-0 left-0
          h-screen
          w-64
          bg-emerald-700
          text-white
          shadow-lg
          z-50
          transform
          transition-transform
          duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* Mobile Close */}

        <div className="lg:hidden flex justify-end p-4">

          <button
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes size={24} />
          </button>

        </div>

        {/* Logo */}

        <div className="p-6 text-2xl font-bold border-b border-emerald-600">
          VolunteerHub
        </div>

        <nav className="mt-6 flex flex-col">

          <NavLink
            to="/dashboard"
            className={menuClass}
            onClick={() => setSidebarOpen(false)}
          >
            <FaHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/profile"
            className={menuClass}
            onClick={() => setSidebarOpen(false)}
          >
            <FaUser />
            Profile
          </NavLink>

          <NavLink
            to="/volunteer"
            className={menuClass}
            onClick={() => setSidebarOpen(false)}
          >
            <FaClipboardList />
            Volunteer Form
          </NavLink>

          <NavLink
            to="/events"
            className={menuClass}
            onClick={() => setSidebarOpen(false)}
          >
            <FaCalendarAlt />
            Events
          </NavLink>

          <NavLink
            to="/settings"
            className={menuClass}
            onClick={() => setSidebarOpen(false)}
          >
            <FaCog />
            Settings
          </NavLink>

          <button
            onClick={logout}
            className="flex items-center gap-3 px-6 py-4 mt-6 hover:bg-red-600 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </nav>

      </aside>
    </>
  );
}