import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHandsHelping,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-5 py-4">

        <div className="flex justify-between items-center">

          {/* Logo */}

          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2 text-2xl font-bold text-emerald-600"
          >
            <FaHandsHelping />
            VolunteerHub
          </Link>

          {/* Desktop */}

          <div className="hidden lg:flex items-center gap-8">

            <Link to="/">Home</Link>

            <Link to="/about">About</Link>

            <Link to="/contact">Contact</Link>

            {user ? (
              <>
                <Link
                  to={
                    user.role === "admin"
                      ? "/admin"
                      : "/dashboard"
                  }
                  className="bg-emerald-600 text-white px-5 py-2 rounded-lg"
                >
                  Dashboard
                </Link>

                <button
                  onClick={logout}
                  className="border border-red-600 text-red-600 px-5 py-2 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border border-emerald-600 px-5 py-2 rounded-lg"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-emerald-600 text-white px-5 py-2 rounded-lg"
                >
                  Register
                </Link>
              </>
            )}

          </div>

          {/* Mobile Toggle */}

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-3xl text-emerald-600"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>

        </div>

        {/* Mobile Menu */}

        {open && (

          <div className="lg:hidden mt-5 border-t pt-5">

            <div className="flex flex-col gap-4">

              <Link to="/" onClick={closeMenu}>
                Home
              </Link>

              <Link to="/about" onClick={closeMenu}>
                About
              </Link>

              <Link to="/contact" onClick={closeMenu}>
                Contact
              </Link>

              {user ? (
                <>
                  <Link
                    to={
                      user.role === "admin"
                        ? "/admin"
                        : "/dashboard"
                    }
                    onClick={closeMenu}
                    className="bg-emerald-600 text-white py-3 rounded-lg text-center"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="border border-red-600 text-red-600 py-3 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="border border-emerald-600 py-3 rounded-lg text-center"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="bg-emerald-600 text-white py-3 rounded-lg text-center"
                  >
                    Register
                  </Link>
                </>
              )}

            </div>

          </div>

        )}

      </div>

    </nav>
  );
}