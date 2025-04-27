import React from "react";
import TaskCard from "./TaskCard";

const TaskColumn = ({ status, tasks, onMove, onDelete }) => {
  let columnClasses = "w-full md:w-1/3 p-2 rounded ";
  let headingClasses = "text-xl font-bold mb-4 ";

  if (status === "To Do") {
    columnClasses += "bg-[#EEF2FF] ";
    headingClasses += "text-[#4F46E5]";
  } else if (status === "In Progress") {
    columnClasses += "bg-gray-100 border border-indigo-500 ";
  } else if (status === "Done") {
    columnClasses += "bg-[#FEE2E2] ";
    headingClasses += "text-[#FB7185]";
  }

  return (
    <div className={columnClasses}>
      <h2 className={headingClasses}>{status}</h2>
      {tasks.length === 0 && <p className="text-gray-500">No tasks</p>}
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onMove={onMove} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskColumn;
