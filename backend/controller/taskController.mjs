import { TaskModel } from '../model/TaskModel.mjs';

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, status } = req.body;
    if (!title || !assignedTo) {
      return res.status(400).json({ message: 'Title and assignedTo are required' });
    }
    const newTask = new TaskModel({ title, description, assignedTo, status });
    await newTask.save();
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error('Error in createTask:', error);
    res.status(500).json({ message: 'Server error during task creation', error: error.message });
  }
};

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find().populate('assignedTo', 'username email');
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error in getTasks:', error);
    res.status(500).json({ message: 'Server error fetching tasks', error: error.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedTask = await TaskModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    console.error('Error in updateTask:', error);
    res.status(500).json({ message: 'Server error updating task', error: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await TaskModel.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error in deleteTask:', error);
    res.status(500).json({ message: 'Server error deleting task', error: error.message });
  }
};
