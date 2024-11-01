import React from "react";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="text-center p-8 rounded-lg shadow-lg bg-white bg-opacity-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page!</h1>
        <p className="text-lg mb-6">
          This is a simple homepage styled with Tailwind CSS. Explore the app to
          find more features!
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
