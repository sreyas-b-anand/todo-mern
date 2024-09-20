const express = require('express')
const {
  getTasks,
  getTask, 
  createTask, 
  deleteTask,
  updateTask
} = require('../controller/taskController')
const requireAuth = require('../middleware/requirAuth')
const router = express.Router()

router.use(requireAuth)

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);
module.exports = router;
