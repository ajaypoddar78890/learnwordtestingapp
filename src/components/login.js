// src/LoginPage.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginPage = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  // Check if user is authenticated
  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl mb-4">Welcome, {user.name}</h2>
          <p className="text-gray-600">You are logged in!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-6">Log In / Sign Up</h1>
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Log In with Auth0
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
