import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-5xl font-bold mb-6 text-indigo-900">Welcome to the Task Management App</h1>
      <p className="text-lg mb-8 text-gray-600">Manage your tasks efficiently and stay organized.</p>
      <div className="space-x-4">
        <button
          onClick={() => navigate('/register')}
          className="px-6 py-3 bg-indigo-900 text-white rounded hover:bg-indigo-800 transition"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;

