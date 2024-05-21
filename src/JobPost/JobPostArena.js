import React, { useEffect, useState } from "react";
import "./JobPostArena.css"; // You can create this file for styling
import { useHistory } from "react-router-dom";
import axios from "axios";
import JobPost from "./JobPostRendering";

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
        history.push("/alumni-login");
      } else {
        console.error("Error fetching pending requests:", error);
      }
    }
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from backend
    fetch("http://localhost:8181/fetch/allJobPost")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleUserLogOutButton = () => {
    userLogOut();
  };

  const handlePostJobButton = () => {
    history.push("/PostingJob");
  };

  return (
    <main>
      <div className="job-post-page">
        <header className="header">
          <h1>Job Posts</h1>
        </header>

        <button className="logout-button" onClick={handlePostJobButton}>
          Post Job
        </button>

        <button
          className="btn btn-primary"
          onClick={() => {
            window.location.href = "/User-Profile";
          }}
        >
          <span className="font-weight-bold">See Profile</span>
        </button>

        <div className="admin-header">
          <button className="logout-button" onClick={handleUserLogOutButton}>
            User Logout
          </button>
        </div>

        <div className="posts-container">
          {posts.map((post) => (
            <JobPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default UserAuth;
