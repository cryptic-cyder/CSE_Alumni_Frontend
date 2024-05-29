import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JobPostRendering.css"; // Import the CSS file
import { useHistory } from "react-router-dom";

const JobPost = ({ post }) => {
  const history = useHistory();

  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [resume, setResume] = useState(null);
  const [showAddCommentForm, setShowAddCommentForm] = useState(false);

  useEffect(() => {
    console.log("Post data:", post);
  }, [post]);

  const fetchComments = async () => {
    const token = localStorage.getItem("tokenUser");

    if (!token) {
      alert("Token not found...You have not logged in...Please log in first");
      history.push("/alumni-login");
    }

    try {
      const response = await axios.post(
        `http://localhost:8181/fetch/allCommentOfAnyPost/${post.id}`,
        {}, // This is the data parameter, which is empty in this case
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setComments(response.data);
        setShowComments(true); // Show comments after fetching them
      } 
      else if (response.status === 401) {
        alert("Your token is expired...Please log in first...");
        history.push("/alumni-login");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleButtonClick = async () => {
    if (!showComments) {
      fetchComments();
    } else {
      setShowComments(false);
    }
  };

  const handleCommentChange = (e) => setCommentText(e.target.value);
  const handleResumeChange = (e) => setResume(e.target.files[0]);

  const handleAddCommentClick = async () => {
    const formData = new FormData();
    formData.append("commentText", commentText);
    if (resume) {
      formData.append("resume", resume);
    }

    const token = localStorage.getItem("tokenUser");

    if (!token) {
      alert("Token not found...You have not logged in...Please log in first");
      history.push("/alumni-login");
    }

    try {
      const response = await axios.post(
        `http://localhost:8181/comment/${post.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Comment added:", response.data);
        fetchComments();
      } else if (response.status === 401) {
        alert("Your token is expired...Please log in first...");
        history.push("/alumni-login");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async (email) => {
      try {
        const token = localStorage.getItem("tokenUser");
  
        if (!token) {
          alert("Token not found...You have not logged in...Please log in first");
          history.push("/alumni-login");
          return;
        }
  
        const response = await axios.post(
          `http://localhost:8181/fetchOthers/${email}`,
          null, // No request body needed for this endpoint
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
  
        const userData = response.data;
  
        setProfile(userData); // Update the profile state
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
  
    if (post && post.userEmail) {
      fetchData(post.userEmail); // Fetch data only if post.userEmail is available
    }
  }, [post]); // Include post in the dependency array
  


  const dummyPic = "https://via.placeholder.com/150";



  const goToUserProfile = () => {
    history.push({
      pathname: "/othersPerson",
      state: { person: profile }
    });
  };






  return (


    <div className="job-post">
    {profile && (
      <div className="user-profile" onClick={goToUserProfile}>

        <div className="profile-picture">
          <img
            src={profile.profilePic ? `data:image/jpeg;base64,${profile.profilePic}` : dummyPic}
            alt="Profile"
          />
        </div>
        <div className="profile-info">
          <p>{profile.userEmail}</p>
          <p>{profile.name}</p>
        </div>
      </div>
    )}
  
    <h2>
      <b>{post.title}</b>
    </h2>
    <p>{post.description}</p>
  
    {post.images && post.images.length > 0 && (
      <div className="images" style={{ display: "flex", flexWrap: "wrap" }}>
        {post.images.map((image, index) => (
          <img
            key={index}
            src={`data:image/jpeg;base64,${image}`}
            alt={`Job post ${post.id}`}
            style={{ width: "300px", height: "200px", margin: "5px" }} // Adjust width and margin as needed
          />
        ))}
      </div>
    )}
  
    <button className="comments-button" onClick={handleButtonClick}>
      {showComments ? "Hide Comments" : "See Comments"}
    </button>
  
    <button
      className="add-comments-button"
      onClick={() => setShowAddCommentForm(true)}
    >
      Add Comments
    </button>
  
    {showAddCommentForm && (
      <div className="add-comment">
        <textarea
          className="comment-textarea"
          placeholder="Enter your comment"
          value={commentText}
          onChange={handleCommentChange}
        />
        <input
          className="comment-file-input"
          type="file"
          accept="application/pdf"
          onChange={handleResumeChange}
        />
        <button
          className="submit-comment-button"
          onClick={handleAddCommentClick}
        >
          Submit Comment
        </button>
      </div>
    )}
  
    {showComments && (
      <div className="comments-container">
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment-container">
              <div className="comment">
                {comment.textContent && <p>{comment.textContent}</p>}
                {comment.url && (
                  <div className="resume">
                    <a
                      href={`http://localhost:8181/pdf/${encodeURIComponent(
                        comment.url.split("/").pop()
                      )}`}
                      download
                    >
                      <b>Download resume</b>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No comments available</p>
        )}
      </div>
    )}
  </div>
  


  );
};

export default JobPost;
