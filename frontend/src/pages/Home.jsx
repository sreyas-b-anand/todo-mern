import { createContext, useEffect, useState } from "react";
import { useTaskContext } from "../hooks/useTaskContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import TaskDetails from "../components/Card";
import New from "../components/New";
import Navbar from "../components/Navbar";
import UserProfileAccordion from "../components/userProfile";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

export const DisplayContext = createContext();
const Home = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const [accordionDisplay, setAccordionDisplay] = useState(null);

  const { tasks, dispatch } = useTaskContext();
  const { user } = useAuthContext();
  const [display, setDisplay] = useState(false);
  const handleClick = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/tasker", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "GET_TASKS", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <>
      <div className=" home w-screen h-screen bg-bg absolute   -z-10">
        <DisplayContext.Provider value={{ display, setDisplay }}>
          <Navbar
            accordionDisplay={accordionDisplay}
            setAccordionDisplay={setAccordionDisplay}
          />
          <div
            className={
              accordionDisplay
                ? "opacity-[1] px-6 translate-y-[10%] transition-all duration-[0.4s] ease-in-out z-50 absolute w-screen flex justify-end items-center"
                : "opacity-[0] px-6 translate-y-[0%]  transition-all duration-[0.4s] ease-in-out z-50 absolute w-screen flex justify-end items-center"
            }
          >
            {user && (
              <UserProfileAccordion user={user} handleClick={handleClick} />
            )}
          </div>
          <div
            className={
              display
                ? " opacity-[0.2] w-screen  flex items-center justify-center flex-wrap p-12 gap-8 absolute -z-10"
                : "opacity-[1] w-screen  flex items-center justify-center flex-wrap p-12 gap-8 absolute -z-10"
            }
          >
            {tasks &&
              tasks.map((task, index) => {
                return <TaskDetails key={index} task={task} />;
              })}
          </div>

          {display && (
            <div className={" z-20 absolute "}>
              <New />
            </div>
          )}
        </DisplayContext.Provider>
      </div>
    </>
  );
};

export default Home;
