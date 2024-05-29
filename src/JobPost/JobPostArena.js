import React, { useEffect, useState } from "react";
import "./JobPostArena.css"; // You can create this file for styling
import { useHistory } from "react-router-dom";
import axios from "axios";
import JobPost from "./JobPostRendering";
import Navbar1 from "../components/Navbar1";

const UserAuth = () => {
  // Capitalized component name
  const history = useHistory();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from backend
    fetch("http://localhost:8181/fetch/allJobPost")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handlePostJobButton = () => {
    history.push("/PostingJob");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("tokenUser");

      if (!token) {
        alert("Token not found...You have not logged in...Please log in first");
        history.push("/alumni-login");
        return;
      }

      const requestBody = {
        searchContent: searchQuery,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      };

      const response = await axios.post(
        "http://localhost:8181/search",
        requestBody,
        config
      );

      const searchResults = response.data;

      if (response.status === 404) {
        setFilteredPosts([]);
        //setError("No matching jobs found.");
      } else {
        setFilteredPosts(searchResults);
        //setError(null); // Reset error if search is successful
      }

      setIsSearching(true);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setFilteredPosts([]);
        //setError("No matching jobs found.");
      } else {
        console.error("Error fetching data:", error);
        //setError("An error occurred while searching for jobs.");
      }
      setIsSearching(true);
    }
  };

  return (
    <main>
      <Navbar1 />

      <div className="job-post-page">
        <header className="header">
          <div className="search-bar-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search jobs..."
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </header>

        <div
          className="button-container"
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <button
            className="add-comments-button"
            onClick={handlePostJobButton}
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            Post Job
          </button>
        </div>

        <div className="posts-container">
          {isSearching
            ? filteredPosts.map((post) => <JobPost key={post.id} post={post} />)
            : posts.map((post) => <JobPost key={post.id} post={post} />)}
        </div>
      </div>
    </main>
  );
};

export default UserAuth;
