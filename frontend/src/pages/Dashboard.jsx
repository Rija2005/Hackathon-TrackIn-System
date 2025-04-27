import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, moveTask, deleteTask, createTask } from "../redux/slices/taskSlice";
import TaskColumn from "../Components/TaskColumn";
import TaskForm from "../Components/TaskForm";
import axiosInstance from "../redux/axios";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, isError, message } = useSelector((state) => state.task);
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleMove = (id, newStatus) => {
    dispatch(moveTask({ id, status: newStatus }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(id));
    }
  };

  const handleCreate = (taskData) => {
    dispatch(createTask(taskData)).then(() => {
      setShowForm(false);
      dispatch(fetchTasks());
    });
  };

  // Filter tasks by status
  const todoTasks = tasks ? tasks.filter((task) => task.status === "To Do") : [];
  const inProgressTasks = tasks ? tasks.filter((task) => task.status === "In Progress") : [];
  const doneTasks = tasks ? tasks.filter((task) => task.status === "Done") : [];

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="mb-4">
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create New Task
          </button>
        )}
        {showForm && (
          <TaskForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
            users={users}
          />
        )}
      </div>

      {isLoading && <p>Loading tasks...</p>}
      {isError && <p className="text-red-600">Error: {message}</p>}

      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <TaskColumn
          status="To Do"
          tasks={todoTasks}
          onMove={handleMove}
          onDelete={handleDelete}
        />
        <TaskColumn
          status="In Progress"
          tasks={inProgressTasks}
          onMove={handleMove}
          onDelete={handleDelete}
        />
        <TaskColumn
          status="Done"
          tasks={doneTasks}
          onMove={handleMove}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Dashboard;
