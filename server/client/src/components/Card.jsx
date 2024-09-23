import React  from "react";
import { MdDelete } from "react-icons/md";
import { useTaskContext } from "../hooks/useTaskContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { FaEdit } from "react-icons/fa";
// date fns
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

const TaskDetails = ({ task }) => {
  const { dispatch } = useTaskContext();
  const { user } = useAuthContext();
 const navigate = useNavigate()
  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/tasker/" + task._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: json });
    }
  };
  
  
  return (
    <>
      <div className="font-[Montserrat] rounded w-72 flex gap-4 flex-wrap flex-col z-0 p-6 bg-bgcard text-textPrimary">
      <header className="flex w-[100%] items-center justify-between">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-textPrimary">
          {task.heading}
        </h5>
      </header>

      <section className="text-textSecondary">{task.desc}</section>
      <section className="text-base text-slate-600 w-[100%]">
        <strong>Due Date</strong> : {task.due}
      </section>
      <article className="w-[100%] text-slate-600">
        <p>
          <strong>Deadline</strong>:{" "}
          {/*formatDistanceToNow(task.due, { addSuffix: true })*/}
        </p>
      </article>

      <span>Status : {task.status}</span>

      <section className="w-full justify-center p-3 flex items-center flex-wrap gap-5">
       
        <span className="hover:cursor-pointer" onClick={handleDelete}>
          <MdDelete color="gray" size={"25px"} />
        </span>

        
        <span className="hover:cursor-pointer" onClick={() => navigate(`/${task._id}`)}>
          <FaEdit color="gray" size={"25px"} />
        </span>
      </section>
    </div>
    </>
  );
};

export default TaskDetails;
