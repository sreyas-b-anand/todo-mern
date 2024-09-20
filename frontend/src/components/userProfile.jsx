import React from "react";


const UserProfileAccordion = ({ user, handleClick }) => {
  return (
    <div className="z-50 rounded-md border p-2  transition-all duration-[2s] ease-in-out overflow-visible px-1" style={{ display: 'inline-block' }}>
      <span className="flex flex-wrap flex-col items-center justify-center gap-4 p-2 border-b-gray-500">
        <p>{user.email}</p>
        <button className="text-sm opacity-[0.7] hover:opacity-[1] border border-red-500 p-1 rounded-md text-red-500" onClick={handleClick}>LOG OUT</button>
      </span>
    </div> 
  );
};

export default UserProfileAccordion;
