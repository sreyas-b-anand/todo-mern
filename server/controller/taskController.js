import Tasks from '../models/taskSchema.js'; 
import mongoose from 'mongoose';

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const user_id = req.user._id;
    const tasks = await Tasks.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Get a single task
export const getTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such task' });
  }

  try {
    const task = await Tasks.findById(id);

    if (!task) {
      return res.status(404).json({ error: 'No such task' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  const { heading, desc, due, status } = req.body;

  try {
    const user_id = req.user._id;
    const task = await Tasks.create({ heading, desc, due, status, user_id });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such task' });
  }

  try {
    const task = await Tasks.findOneAndDelete({ _id: id });

    if (!task) {
      return res.status(400).json({ error: 'No such task' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such task' });
  }

  try {
    const task = await Tasks.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

    if (!task) {
      return res.status(400).json({ error: 'No such task' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};
