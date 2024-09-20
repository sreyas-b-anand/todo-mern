import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useContext, useState } from "react";
import { DisplayContext } from "../pages/Home";
import { CgProfile } from "react-icons/cg";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserProfileAccordion from "./userProfile";

const Navbar = ({accordionDisplay , setAccordionDisplay}) => {
 
  
  const { user } = useAuthContext();
  const {display, setDisplay } = useContext(DisplayContext);
  

  return (
    <div className=" bg-navbg flex  items-center justify-between w-screen h-[80px] text-navText">
      <header className="flex items-baseline gap-8">
        <p className=" text-navText flex items-center justify-center font-bold  text-2xl ml-9 gap-5">
          Tasker
        </p>
        <nav className="mr-8 gap-8 flex">
          <Link
            onClick={() => {
              setDisplay(!display);
            }}
            role="button"
            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700"
          >
            Add
          </Link>
        </nav>
      </header>
      {user && (
        <div className="flex items-center text-gray-200 m-3  mr-9 gap-2 hover:cursor-pointer">
          
          <section>
            <CgProfile
            size={'30px'}
              onClick={() => {
                
                setAccordionDisplay(!accordionDisplay);
              }}
            />
          </section>
        </div>
      )}
    </div>
  );
};

export default Navbar;
