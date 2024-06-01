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
            'Authorization': token
          }
        };
    
        const response = await axios.post(
          "http://localhost:8181/fetch/allJobPostOfAnyUser",
          null,  // No request body
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
        alert("An error occurred while validating the token. Please try again.");
        history.push("/alumni-login");
      }
    };

    fetchPosts(); // Call the fetchPosts function
  }, [history, token]);

  return (
    <div>
      <Navbar1/>
      <h1><b><center>My Posts</center></b></h1>
      {posts.map((post) => (
        <JobPost key={post.id} post={post} /> // Render the JobPost component for each post
      ))}
    </div>
  );
};

export default MyJobPostsPage;
