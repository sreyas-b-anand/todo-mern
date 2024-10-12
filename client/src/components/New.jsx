import React, { useContext, useState } from "react";
import { DisplayContext } from "../pages/Home";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTaskContext } from "../hooks/useTaskContext";

const NewTask = () => {
  //context
  const { setDisplay } = useContext(DisplayContext);
  const { dispatch } = useTaskContext();
  const { user } = useAuthContext();

  const [heading, setHeading] = useState("");
  const [desc, setDesc] = useState("");
  const [due, setDueDate] = useState("");
  const [error, setError] = useState(null);
  const status = "pending";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming user authentication context exists
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const task = { heading, desc, due, status };

    const response = await fetch("/api/tasker", {
      // Updated API endpoint
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`, // Assuming user.token exists
      },
    });

    const json = await response.json();

    if (response.ok) {
      setHeading("");
      setDesc("");
      setDueDate("");
      setDisplay(false);

      // Close form on successful submission
      dispatch({ type: "CREATE_TASK", payload: json });
    }
  };

  return (
    <div className="new-task absolute z-20 flex justify-center items-center mt-24 w-screen text-white">
      <div className="bg-slate-600 p-6 rounded-lg shadow-lg max-w-md w-full">
        <form className="space-y-4">
          <header className="text-center  font-semibold text-lg mb-4">
            Add Your Task
          </header>
          <div>
            <label
              htmlFor="task-heading"
              className="block text-white text-sm font-medium mb-1"
            >
              Task Heading
            </label>
            <input
              type="text"
              id="task-heading"
              placeholder="Enter task heading"
              className="w-full p-2 bg-bg text-black border border-borderPrimary rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="task-description"
              className="block  text-sm font-medium mb-1"
            >
              Task Description
            </label>
            <textarea
              id="task-description"
              placeholder="Enter task description"
              className="w-full p-2 bg-bg  text-black  border border-borderPrimary rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="due-date"
              className="block  text-sm font-medium mb-1"
            >
              Due Date
            </label>
            <input
              type="date"
              id="due-date"
              className="w-full p-2 text-black bg-bg border border-borderPrimary rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              value={due}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center">
            <p className="">Status: Pending</p>
            <button
              onClick={handleSubmit}
              type="button"
              className="px-4 py-2 bg-accent text-navText rounded-md hover:bg-navbarHover focus:outline-none focus:ring-2 focus:ring-accent"
            >
              Add Task
            </button>
            <button
              type="button"
              onClick={() => setDisplay(false)}
              className="px-4 py-2 bg-accent text-navText rounded-md hover:bg-navbarHover focus:outline-none focus:ring-2 focus:ring-accent"
            >
              Cancel
            </button>
          </div>
          {error && <p className="text-highlight">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default NewTask;
