import { Link } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { useContext } from "react";
import { DisplayContext } from "../pages/Home";
import { CgProfile } from "react-icons/cg";

const Navbar = ({ accordionDisplay, setAccordionDisplay }) => {
  const { user } = useAuthContext();
  const { display, setDisplay } = useContext(DisplayContext);

  return (
    <div className=" bg-navbg flex  items-center justify-between w-screen h-[80px] text-navText">
      <header className="flex items-baseline gap-8">
        <p className=" text-navText flex items-center justify-center font-bold  text-2xl ml-9 gap-5">
          Tasker
        </p>
        <nav className="mr-8 gap-2 flex">
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

      <nav className="flex items-center text-gray-200 m-3  mr-9 gap-2 hover:cursor-pointer">
        {user && (
          <div>
            <CgProfile
              size={"30px"}
              onClick={() => {
                setAccordionDisplay(!accordionDisplay);
              }}
            />
          </div>
        )}
        {!user && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
