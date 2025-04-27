import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <div className="text-xl font-bold">Task Board</div>
      <div>
        <Link to="/taskboard" className="mr-4 hover:underline">Task Board</Link>
        <Link to="/login" className="mr-4 hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
