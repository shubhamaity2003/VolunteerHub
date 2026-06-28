import {
  FaHome,
  FaUsers,
  FaCalendarAlt,
  FaCog,
  FaEnvelope,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminSidebar({
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

        {/* Close Button */}

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

        {/* Navigation */}

        <nav className="mt-6 flex flex-col">

          <NavLink
            to="/admin"
            end
            className={menuClass}
            onClick={() => setSidebarOpen(false)}
          >
            <FaHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/volunteers"
            className={menuClass}
            onClick={() => setSidebarOpen(false)}
          >
            <FaUsers />
            Manage Volunteers
          </NavLink>

          <NavLink
            to="/admin/events"
            className={menuClass}
            onClick={() => setSidebarOpen(false)}
          >
            <FaCalendarAlt />
            Manage Events
          </NavLink>

          <NavLink
            to="/admin/messages"
            className={menuClass}
            onClick={() => setSidebarOpen(false)}
          >
            <FaEnvelope />
            Contact Messages
          </NavLink>

          <NavLink
            to="/admin/settings"
            className={menuClass}
            onClick={() => setSidebarOpen(false)}
          >
            <FaCog />
            Settings
          </NavLink>

          <button
            onClick={() => {
              logout();
              setSidebarOpen(false);
            }}
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