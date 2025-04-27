import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const TaskForm = ({ initialValues, onSubmit, onCancel, users }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      title: "",
      description: "",
      assignedTo: users.length > 0 ? users[0]._id : "",
      status: "To Do", // default status when creating
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      assignedTo: Yup.string().required("Assigned To is required"),
      status: Yup.string().oneOf(["To Do", "In Progress", "Done"]).required(),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
    enableReinitialize: true, // Important for editing existing task
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{initialValues ? "Edit Task" : "Create Task"}</h2>

      <div className="mb-4">
        <label htmlFor="title" className="block font-semibold mb-1">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          className="w-full border px-3 py-2 rounded"
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="text-red-600 text-sm">{formik.errors.title}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block font-semibold mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          className="w-full border px-3 py-2 rounded"
          rows="3"
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="text-red-600 text-sm">{formik.errors.description}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="assignedTo" className="block font-semibold mb-1">Assigned To</label>
        <select
          id="assignedTo"
          name="assignedTo"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.assignedTo}
          className="w-full border px-3 py-2 rounded"
        >
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
        {formik.touched.assignedTo && formik.errors.assignedTo ? (
          <div className="text-red-600 text-sm">{formik.errors.assignedTo}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="status" className="block font-semibold mb-1">Status</label>
        <select
          id="status"
          name="status"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.status}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        {formik.touched.status && formik.errors.status ? (
          <div className="text-red-600 text-sm">{formik.errors.status}</div>
        ) : null}
      </div>

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {initialValues ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
