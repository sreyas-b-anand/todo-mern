import React from "react";
import { MdDelete } from "react-icons/md";
import { useTaskContext } from "../hooks/useTaskContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import {  formatDistanceToNow} from "date-fns";

const TaskDetails = ({ task }) => {
  const { dispatch } = useTaskContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/tasker/" + task._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: json });
    }
  };

  return (
    <>
     
        <div className="font-[Montserrat] rounded w-72 flex gap-4 flex-wrap flex-col z-0 p-6  bg-bgcard text-textPrimary">
          <header className="flex w-[100%] items-center justify-between">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-textPrimary">
              {task.heading}
            </h5>
            <span className="hover:cursor-pointer" onClick={handleClick}><MdDelete color="gray" size={'25px'}/></span>
          </header >
            <section className=" text-textSecondary"> 
                {task.desc}
            </section>
          <section className=" text-base text-slate-600 w-[100%]">
           <strong> Due Date </strong> : {task.due}
          </section>
          <article className="w-[100%] text-slate-600">
            <p>
            <strong>Deadline </strong>:  {formatDistanceToNow(new Date(task.due), { addSuffix: true })}

            </p>
          </article>
    
      </div>
    </>
  );
};

export default TaskDetails;
