import React from "react";
import "./JobPostArena.css"; // You can create this file for styling
import { useHistory } from "react-router-dom";
import axios from "axios";

const UserAuth = () => {
  // Capitalized component name
  const history = useHistory();

  const userLogOut = async () => {
    try {
      const token = localStorage.getItem("tokenUser");

      if (!token) {
        console.error("Token not found");
        return;
      }

      const requestBody = { token };

      const response = await axios.post(
        "http://localhost:8181/UserLogout",
        requestBody
      );

      if (response.status === 200) {
        alert("Successfully logout");
        localStorage.removeItem("tokenUser");
        history.push("/alumni-login");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access. Please log in again.");
        alert("Token is invalid. Please log in again.");
      } else {
        console.error("Error fetching pending requests:", error);
      }
    }
  };

  const handleUserLogOutButton = () => {
    userLogOut();
  };

  return (
    <main>
      <h1>Welcome to jobArena</h1>
      <div className="admin-header">
        <button className="logout-button" onClick={handleUserLogOutButton}>
          User Logout
        </button>

        <p className="small mb-0">
          <i className="bi bi-people-fill"></i> Want to go profile{" "}
          <a href="/User-Profile">
            <span className="font-weight-bold base-color">Cick Here</span>
          </a>
        </p>

      </div>
    </main>
  );
};

export default UserAuth;
