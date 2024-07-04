import React, { useState, useEffect } from "react";
import axios from "axios";
import JobPost from "./UserJobPostRender"; // Import the JobPost component
import { useHistory } from "react-router-dom";
import Navbar1 from "../components/Navbar1";

const MyJobPostsPage = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("tokenUser");

  useEffect(() => {
    const fetchPosts = async () => {
      if (!token) {
        alert("Token not found...You have not logged in...Please log in first");
        history.push("/alumni-login");
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: token,
          },
        };

        const response = await axios.post(
          "http://localhost:8181/fetch/allJobPostOfAnyUser",
          null, // No request body
          config
        );

        if (response.status === 200) {
          setPosts(response.data); // Set the posts in state
        } else {
          alert("Token is invalid...Please log in again.");
          history.push("/alumni-login");
        }
      } catch (error) {
        console.error("Error validating token:", error);
        alert(
          "An error occurred while validating the token. Please try again."
        );
        history.push("/alumni-login");
      }
    };

    fetchPosts(); // Call the fetchPosts function
  }, [history, token]);

  return (
    <div>
      <Navbar1 />

      <div
        style={{
          backgroundColor: "#3498db", // Pure black background
          color: "#000000", // White text
          padding: "1rem",
          borderRadius: "5px",
          textAlign: "center",
          width: "fit-content", // Adjusting width to fit content
          margin: "2rem auto 2rem 0", // Centering the box and pushing it to the left
        }}
      >
        <h1 style={{ fontSize: "1.3rem", fontWeight: "bold" }}>My Posts</h1>
      </div>

      {posts.map((post) => (
        <JobPost key={post.id} post={post} /> // Render the JobPost component for each post
      ))}
    </div>
  );
};

export default MyJobPostsPage;
