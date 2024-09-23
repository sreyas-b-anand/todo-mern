import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTaskContext } from "../hooks/useTaskContext";

const EditForm = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { dispatch } = useTaskContext()
  const [heading, setHeading] = useState("");
  const [desc, setDesc] = useState("");
  const [due, setDueDate] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
    useEffect(()=>{
      const fetchTask = async () => {
        if (user) {
          try {
            const response = await fetch("/api/tasker/" +id, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            });
            //console.log("Raw Response:", response); // Log the response before parsing
            //console.log("User:", user);
            //console.log("Token:", user?.token);
            
            if (!response.ok) {
              throw new Error('Failed to fetch task details');
            }
    
            const json = await response.json();
            //console.log("JSON Response:", json);
            setHeading(json.heading || ''); // Set a fallback value if the field is empty
            setDesc(json.desc || '');
            setDueDate(json.due || '');
          } catch (error) {
            setError(error.message);
          }
        }
      
    
      }
      fetchTask()
    } , [])
  // Handle the form submission for updating the task
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTask = { heading, desc, due };

    const response = await fetch("/api/tasker/" + id, {
      method: "PATCH",  // PATCH for partial updates
      body: JSON.stringify(updatedTask),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if(response.ok){
      dispatch({
        type:'UPDATE_TASK',
        payload : json
      })
    }
    if (!response.ok) {
      setError(json.error);
    } else {
      // Redirect back to the dashboard after a successful edit
      navigate("/");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="new-task absolute z-20 flex justify-center items-center mt-24 w-screen text-white">
      <div className="bg-slate-600 p-6 rounded-lg shadow-lg max-w-md w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <header className="text-center font-semibold text-lg mb-4">
            Edit Your Task
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
              className="block text-white text-sm font-medium mb-1"
            >
              Task Description
            </label>
            <textarea
              id="task-description"
              placeholder="Enter task description"
              className="w-full p-2 bg-bg text-black border border-borderPrimary rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="due-date"
              className="block text-white text-sm font-medium mb-1"
            >
              Due Date
            </label>
            <input
              type="date"
              id="due-date"
              className="w-full p-2 bg-bg text-black border border-borderPrimary rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              value={due}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center">
            <p>Status: Pending</p>
            <button
              type="submit"
              className="px-4 py-2 bg-accent text-navText rounded-md hover:bg-navbarHover focus:outline-none focus:ring-2 focus:ring-accent"
            >
              Update Task
            </button>
            <button
              type="button"
              onClick={handleCancel}
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

export default EditForm;
