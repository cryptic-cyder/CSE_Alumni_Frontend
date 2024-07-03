import React, { useEffect, useState } from "react";
import "./JobPostArena.css"; // You can create this file for styling
import { useHistory } from "react-router-dom";
import axios from "axios";
import JobPost from "./JobPostRendering";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";

const UserAuth = () => {
  const history = useHistory();

  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Fetch posts from backend
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8181/fetch/allJobPost"
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePostJobButton = () => {
    history.push("/PostingJob");
  };

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("tokenUser");
  
      if (!token) {
        alert("Token not found...You have not logged in...Please log in first");
        history.push("/alumni-login");
        return;
      }
  
      const response = await axios.post(
        "http://localhost:8181/search",
        { searchContent: searchQuery },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if(response.status===401){
        alert("Token is invalid. Please log in again.");
        history.push("/alumni-login");
      }
  
      setFilteredPosts(response.data);
      setIsSearching(true);
    } 
    catch (error) {
      console.error("Error searching posts:", error);
    }
  };

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.postedAt) - new Date(a.postedAt)
  );

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
        <div className="button-container">
          <button className="add-comments-button" onClick={handlePostJobButton}>
            Post
          </button>
        </div>
        <div className="posts-container">
          {isSearching
            ? filteredPosts.map((post) => <JobPost key={post.id} post={post} />)
            : sortedPosts.map((post) => <JobPost key={post.id} post={post} />)}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default UserAuth;
