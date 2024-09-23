import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="font-[Montserrat] flex flex-col items-center justify-center h-screen w-screen gap-7 bg-gray-100">
      <h1 className="text-6xl font-bold flex items-center  gap-5 flex-wrap text-wrap">Welcome to <p className='text-blue-600'>Tasker</p></h1>
      <p className="text-lg text-center text-wrap">
        Manage your tasks efficiently and stay organized.
      </p>
      <div className='flex items-baseline justify-center gap-6 p-2 flex-wrap'>
      <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4">
       
          Get Started
        
      </Link>
      <Link
        to="https://github.com/sreyas-b-anand/sreyas-b-anand" 
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline p-2"
      >
        Meet Dev
      </Link>
      </div>
    </div>
  );
}

export default Landing;
