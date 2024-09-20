const mongoose = require("mongoose");

const schema = mongoose.Schema;

const TaskSchema = new schema(
  {
    heading: { type: String, required: true },
    desc: { type: String, required: true },
    due: { type: String, required: true },
    status: { type: String, required: true },
    user_id: { type: String, required: true },
  },
  { timestamps: true }
);

const Tasks = mongoose.model("tasks", TaskSchema);

module.exports = Tasks;
