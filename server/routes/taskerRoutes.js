import express from 'express';
import {
  getTasks,
  getTask, 
  createTask, 
  deleteTask,
  updateTask
} from '../controller/taskController.js';
import requireAuth from '../middleware/requirAuth.js';

const router = express.Router();
//
router.use(requireAuth);

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
