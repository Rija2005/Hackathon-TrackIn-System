import React from 'react';

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h3 className="font-semibold text-lg">{task.title}</h3>
      <p className="text-sm text-gray-600">Assigned to: {task.assignedTo || 'Unassigned'}</p>
    </div>
  );
};

export default TaskCard;
