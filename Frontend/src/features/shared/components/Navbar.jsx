import React from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-slate-900 shadow-md transition-all duration-300">
      {/* LOGO */}
      <Link to="/">
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Kairo AI
        </h1>
      </Link>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        {/* AUTH BUTTONS */}
        {!user ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-white hover:text-indigo-500"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Register
            </Link>
          </>
        ) : (
          <Link
            to="/home"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Go to App
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
