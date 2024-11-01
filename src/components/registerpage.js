// src/RegisterPage.js
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const RegisterPage = () => {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } =
    useAuth0();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Register button clicked"); // Check if the function is called

    if (!isAuthenticated) {
      console.log("User is not authenticated. Redirecting to login...");
      await loginWithRedirect();
      return; // Exit the function after redirect
    }

    console.log("Starting registration process");
    try {
      // Step 1: Register user with Auth0
      console.log("Attempting to register user with Auth0:", {
        email,
        password,
      });
      await registerUser(email, password);

      // Step 2: Synchronize with LearnWorlds
      console.log("Attempting to sync with LearnWorlds for email:", email);
      await syncWithLearnWorlds(email);

      alert("User registered successfully!");
      console.log("User registered successfully and synced with LearnWorlds");
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed. Please try again.");
    }
  };

  const registerUser = async (email, password) => {
    try {
      const token = await getAccessTokenSilently();
      console.log("Obtained Auth0 access token:", token);

      const response = await fetch(
        `https://dev-5w6hgl3kwgr0nxwi.us.auth0.com/api/v2/users`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            connection: "Username-Password-Authentication",
          }),
        }
      );

      console.log("Auth0 registration response status:", response.status);
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Auth0 registration error response:", errorResponse);
        throw new Error("Error registering user: " + errorResponse.message);
      }
    } catch (error) {
      console.error("Error in registerUser function:", error);
      throw error;
    }
  };

  const syncWithLearnWorlds = async (email) => {
    try {
      const response = await fetch(
        "https://dev-5w6hgl3kwgr0nxwi.us.auth0.com/", // Replace with the correct endpoint for LearnWorlds
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            // Add any other necessary user data here
          }),
        }
      );

      console.log("LearnWorlds sync response status:", response.status);
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("LearnWorlds sync error response:", errorResponse);
        throw new Error("Error syncing with LearnWorlds");
      }
    } catch (error) {
      console.error("Error in syncWithLearnWorlds function:", error);
      throw error;
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg rounded-lg p-8 max-w-md w-full mx-auto"
    >
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Join Us!
      </h1>

      <div className="mb-6">
        <label
          className="block text-white text-sm font-semibold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-6">
        <label
          className="block text-white text-sm font-semibold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Create a password"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold py-3 rounded-lg w-full hover:bg-blue-700 transition duration-200 transform hover:scale-105"
      >
        Register
      </button>

      <p className="mt-4 text-center text-white text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline hover:text-blue-300">
          Log in
        </a>
      </p>
    </form>
  );
};

export default RegisterPage;
