import Tasks from '../models/taskschema.js'; 
import mongoose from 'mongoose';

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const user_id = req.user._id;
    console.log(user_id)
    const tasks = await Tasks.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
  
};

// Get a single task

export const getTask = async (req, res) => {
  const { id } = req.params;

  // Validate the ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such task' });
  }

  try {
    // Fetch the task by ID
    const task = await Tasks.findById(id);

    // Check if the task exists
    if (!task) {
      return res.status(404).json({ error: 'No such task' });
    }
      console.log(task)
    // Return the task as JSON
    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task:", error); // Log the error for debugging
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

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  // Destructure the fields from the request body
  const { heading, desc, due, status } = req.body;

  // Optional: You might want to ensure that these fields are provided
  if (!heading || !desc || !due) {
    return res.status(400).json({ error: 'Please provide heading, description, and due date' });
  }

  try {
    const task = await Tasks.findOneAndUpdate(
      { _id: id },
      { heading, desc, due, status }, // Specify fields to update
      { new: true, runValidators: true } // New task and run validation
    );

    if (!task) {
      return res.status(404).json({ error: 'No such task' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};