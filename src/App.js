import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/registerpage";
import Home from "./components/home"; // Import your Home component

const domain = "dev-5w6hgl3kwgr0nxwi.us.auth0.com"; // Replace with your domain
const clientId = "2zSH3jU53PkBUC06AIIUklZ1tDRi75bu"; // Replace with your Client ID

const App = () => {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: "http://localhost:3000",
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Route for Home component */}
          <Route path="/register" element={<RegisterPage />} />{" "}
          {/* Route for RegisterPage */}
          {/* Add other routes here as needed */}
        </Routes>
      </Router>
    </Auth0Provider>
  );
};

export default App;
