import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user info from Redux state
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="bg-[#1F2937] text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">
        <NavLink to="/" className="hover:text-[#4F46E5]">
          Task Manager
        </NavLink>
      </div>

      <div className="flex items-center space-x-6">
        {user ? (
          <>
            <span className="text-gray-200">Welcome, <strong>{user.fullName || user.email}</strong></span>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) =>
                isActive ? "text-[#4F46E5]" : "hover:text-[#4F46E5]"
              }
            >
              Dashboard
            </NavLink>
            <button 
              onClick={handleLogout} 
              className="bg-[#FB7185] hover:bg-[#f87171] px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="hover:text-[#4F46E5]">Login</NavLink>
            <NavLink to="/register" className="hover:text-[#4F46E5]">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
