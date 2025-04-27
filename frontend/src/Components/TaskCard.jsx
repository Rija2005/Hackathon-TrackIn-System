import React from "react";

const TaskCard = ({ task, onMove, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-semibold text-lg">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="mt-2 text-xs italic text-gray-500">Assigned to: {task.assignedTo?.username || "Unassigned"}</p>

      <div className="flex space-x-2 mt-3">
        {task.status === "To Do" && (
          <button
            onClick={() => onMove(task._id, "In Progress")}
            className="bg-[#4F46E5] text-white px-2 py-1 rounded text-xs"
          >
            Move to In Progress
          </button>
        )}

        {task.status === "In Progress" && (
          <>
            <button
              onClick={() => onMove(task._id, "To Do")}
              className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs"
            >
              Move to To Do
            </button>
            <button
              onClick={() => onMove(task._id, "Done")}
              className="bg-[#4F46E5] text-white px-2 py-1 rounded text-xs"
            >
              Move to Done
            </button>
          </>
        )}

        {task.status === "Done" && (
          <button
            onClick={() => onMove(task._id, "In Progress")}
            className="bg-[#4F46E5] text-white px-2 py-1 rounded text-xs"
          >
            Move to In Progress
          </button>
        )}

        <button
          onClick={() => onDelete(task._id)}
          className="bg-[#FB7185] text-white px-2 py-1 rounded text-xs ml-auto"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
