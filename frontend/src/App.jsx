import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskBoardPage from "./pages/TaskBoardPage";
import ProtectedRoutes from "./ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Wrap protected routes here */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<TaskBoardPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
