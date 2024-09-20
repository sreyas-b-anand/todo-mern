import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to Tasker</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        Manage your tasks efficiently with Tasker. Keep track of your to-do lists and never miss a deadline again!
      </p>
      <Link to="/signup">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Landing;
