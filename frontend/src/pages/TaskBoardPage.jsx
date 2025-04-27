import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskCard from '../Components/TaskCard';
import Navbar from '../Components/Navbar';
import { fetchTasks } from '../redux/slices/taskSlice';

const TaskBoardPage = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const statuses = ['To Do', 'In Progress', 'Done'];

  const tasksByStatus = (status) => tasks.filter(task => task.status === status);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Task Board</h1>
        {loading && <p>Loading tasks...</p>}
        {error && <p className="text-red-600">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statuses.map((status) => (
            <div key={status} className="bg-white rounded shadow p-4">
              <h2 className="text-xl font-semibold mb-4">{status}</h2>
              {tasksByStatus(status).length === 0 ? (
                <p className="text-gray-500">No tasks</p>
              ) : (
                tasksByStatus(status).map((task) => (
                  <TaskCard key={task._id} task={task} />
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskBoardPage;
