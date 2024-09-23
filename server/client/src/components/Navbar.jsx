import { Link } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { useContext } from "react";
import { DisplayContext } from "../pages/Home";
import { CgProfile } from "react-icons/cg";
import logo from "../assets/logo.jpg";
const Navbar = ({ accordionDisplay, setAccordionDisplay }) => {
  const { user } = useAuthContext();
  const { display, setDisplay } = useContext(DisplayContext);

  return (
    <div className=" bg-navbg flex  items-center justify-between w-screen h-[80px] text-navText">
      <header className="flex items-center justify-center  gap-7">
        <section className="flex items-center justify-center gap-4 ml-8">
          <img
            src={logo}
            alt="logo"
            className="w-[40px] h-[40px] rounded-[50%]"
          />
          <p className=" text-navText flex items-center justify-center font-bold  text-2xl ">
            Tasker
          </p>
        </section>
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
      </nav>
    </div>
  );
};

export default Navbar;
