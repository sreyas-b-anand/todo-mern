import { createContext, useEffect, useState } from "react";
import { useTaskContext } from "../hooks/useTaskContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import TaskDetails from "../components/Card";
import New from "../components/New";
import Navbar from "../components/Navbar";
import UserProfileAccordion from "../components/userProfile";
import { useLogout } from "../hooks/useLogout";

export const DisplayContext = createContext();
const Home = () => {
  
  const { logout } = useLogout();
  
  const [accordionDisplay, setAccordionDisplay] = useState(null);

  const { tasks, dispatch } = useTaskContext();
  const { user } = useAuthContext();
  const [display, setDisplay] = useState(false);
  const handleClick = () => {
    logout();
    
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/tasker', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}` // If you're using a token
          },
          credentials: 'include' // Include credentials if needed
        });
        if (!response.ok) {
          throw new Error(`Fetch error: ${response.statusText}`);
        }
        const data = await response.json();
        if(response.ok){
          dispatch({type : 'GET_TASKS' , payload:data})
        }
       
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchTasks()
    
  }, [user , dispatch]);

  return (
    <>
      <div className=" home w-screen h-screen bg-bg absolute   -z-10">
        <DisplayContext.Provider
          value={{ display, setDisplay }}
        >
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
              tasks.map((task, index) => (
                <div key={index}>
                  <TaskDetails task={task} />
                </div>
              ))}
              
        
          </div>

          {display && (
            <div className={"z-20 absolute "}>
              <New />
            </div>
          )}
        </DisplayContext.Provider>
      </div>
    </>
  );
};

export default Home;
