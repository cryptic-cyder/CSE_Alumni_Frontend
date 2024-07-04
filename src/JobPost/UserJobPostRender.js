// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./JobPostRendering.css"; // Import the CSS file
// import { useHistory } from 'react-router-dom';
// import Navbar1 from "../components/Navbar1";


// const JobPost = ({ post }) => {
  
//     const history = useHistory();

//   const [comments, setComments] = useState([]);
//   const [showComments, setShowComments] = useState(false);
//   const [commentText, setCommentText] = useState("");
//   const [resume, setResume] = useState(null);
//   const [showAddCommentForm, setShowAddCommentForm] = useState(false);

//   useEffect(() => {
//     console.log("Post data:", post);
//   }, [post]);

//   const fetchComments = async () => {
//     const token = localStorage.getItem("tokenUser");

//     if (!token) {
//       alert("Token not found...You have not logged in...Please log in first");
//         history.push("/alumni-login");
//     }

//     try {
//       const response = await axios.post(
//         `http://localhost:8181/fetch/allCommentOfAnyPost/${post.id}`,
//         {}, // This is the data parameter, which is empty in this case
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if(response.status===200){
//          setComments(response.data);
//          setShowComments(true); // Show comments after fetching them
//       }
//       else if(response.status===401){
//         alert("Your token is expired...Please log in first...");
//         history.push("/alumni-login");
//       }

//     } catch (error) {
//       console.error("Error fetching comments:", error);
//     }
//   };

//   const handleButtonClick = async () => {
//     if (!showComments) {
//       fetchComments();
//     } else {
//       setShowComments(false);
//     }
//   };

//   const handleCommentChange = (e) => setCommentText(e.target.value);
//   const handleResumeChange = (e) => setResume(e.target.files[0]);

//   const handleAddCommentClick = async () => {
//     const formData = new FormData();
//     formData.append("commentText", commentText);
//     if (resume) {
//       formData.append("resume", resume);
//     }

//     const token = localStorage.getItem("tokenUser");

//     if (!token) {
//       alert("Token not found...You have not logged in...Please log in first");
//         history.push("/alumni-login");
//     }

//     try {
//       const response = await axios.post(
//         `http://localhost:8181/comment/${post.id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         alert("Comment added:", response.data);
//         fetchComments();
//       }
//       else if(response.status===401){
//         alert("Your token is expired...Please log in first...");
//         history.push("/alumni-login");
//       }
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     }
//   };

//   return (

//     <main>

   

//     <div className="job-post">
      
//       {/* <h2>{post.id}</h2> */}
//       <h2>
//         <b>{post.title}</b>
//       </h2>
//       <p>{post.description}</p>

//       {post.images && post.images.length > 0 && (
//         <div className="images">
//           {post.images.map((image, index) => (
//             <img
//               key={index}
//               src={`data:image/jpeg;base64,${image}`}
//               alt={`Job post ${post.id}`}
//               style={{ width: "400px", height: "200px" }} // Adjust width and height as needed
//             />
//           ))}
//         </div>
//       )}
//       <button className="comments-button" onClick={handleButtonClick}>
//         {showComments ? "Hide Comments" : "See Comments"}
//       </button>

//       <button
//         className="add-comments-button"
//         onClick={() => setShowAddCommentForm(true)}
//       >
//         Add Comments
//       </button>

//       {showAddCommentForm && (
//         <div className="add-comment">
//           <textarea
//             className="comment-textarea"
//             placeholder="Enter your comment"
//             value={commentText}
//             onChange={handleCommentChange}
//           />
//           <input
//             className="comment-file-input"
//             type="file"
//             accept="application/pdf"
//             onChange={handleResumeChange}
//           />
//           <button
//             className="submit-comment-button"
//             onClick={handleAddCommentClick}
//           >
//             Submit Comment
//           </button>
//         </div>
//       )}

//       {showComments && (
//         <>
//           {Array.isArray(comments) && comments.length > 0 ? (
//             <div className="comments">
//               {comments.map((comment, index) => (
//                 <div key={index} className="comment">
//                   {comment.textContent && <p>{comment.textContent}</p>}
//                   {comment.url && (
//                     <div className="resume">
//                       <a
//                         href={`http://localhost:8181/pdf/${encodeURIComponent(
//                           comment.url.split("/").pop()
//                         )}`}
//                         download
//                       >
//                         <b>Download resume</b>
//                       </a>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p>No comments available</p>
//           )}
//         </>
//       )}
//     </div>

//     </main>
//   );
// };

// export default JobPost;












import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JobPostRendering.css";
import { useHistory } from "react-router-dom";

const JobPost = ({ post }) => {
  const history = useHistory();

  const formatRelativeTime = (timestamp) => {
    const currentDate = new Date();
    const postDate = new Date(timestamp);
    const timeDifference = currentDate - postDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hr${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} sec${seconds > 1 ? "s" : ""} ago`;
    }
  };

  
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [resume, setResume] = useState(null);
  const [showAddCommentForm, setShowAddCommentForm] = useState(false);
  const [postProfile, setPostProfile] = useState(null);
  const [profiles, setProfiles] = useState({});

  useEffect(() => {
    if (post && post.userEmail) {
      fetchProfile(post.userEmail, setPostProfile);
    }
  }, [post]);

  const fetchProfile = async (email, setProfileFn) => {
    const token = localStorage.getItem("tokenUser");

    if (!token) {
      alert("Token not found...You have not logged in...Please log in first");
      history.push("/alumni-login");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8181/fetchOthers/${email}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = response.data;
      setProfileFn(userData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchComments = async () => {
    const token = localStorage.getItem("tokenUser");

    if (!token) {
      alert("Token not found...You have not logged in...Please log in first");
      history.push("/alumni-login");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8181/fetch/allCommentOfAnyPost/${post.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setComments(response.data);
        setShowComments(true);

        response.data.forEach((comment) => {
          if (comment.commenter && !profiles[comment.commenter]) {
            fetchProfile(comment.commenter, (userData) => {
              setProfiles((prevProfiles) => ({
                ...prevProfiles,
                [comment.commenter]: userData,
              }));
            });
          }
        });
      } else if (response.status === 401) {
        alert("Your token is expired...Please log in first...");
        history.push("/alumni-login");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleButtonClick = () => {
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
        setCommentText("");
        setResume(null);
        fetchComments();
      } else if (response.status === 401) {
        alert("Your token is expired...Please log in first...");
        history.push("/alumni-login");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Post management

  const handleMenuClick = () => setShowMenu(!showMenu);

  const handleUpdatePost = async () => {

    const token = localStorage.getItem("tokenUser");

    if (!token) {
      alert("Token not found...You have not logged in...Please log in first");
      history.push("/alumni-login");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8181/verification/${post.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        history.push({
          pathname: "/EditJobPost",
          state: { postId: post.id }
        });
      } 
      else if (response.status === 401) {
        alert("You have not logged in or not the owner of the post...");
        history.push("/Job-Arena");
      }
    } catch (error) {
      alert("You have not logged in or not the owner of the post...");
    }
  };


  const handleDeletePost = async () => {
    const token = localStorage.getItem("tokenUser");

    if (!token) {
      alert("Token not found...You have not logged in...Please log in first");
      history.push("/alumni-login");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8181/delete/${post.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Post deleted successfully");
        window.location.reload();
      } 
      else if (response.status === 401) {
        alert("You have not logged in or not the owner of the post...");
      }
    } catch (error) {
      alert("You have not logged in or not the owner of the post...");
    }
  };

  const [showCommentMenu, setShowCommentMenu] = useState({});

  const handleCommentMenuClick = (commentMenuId) => {
    setShowCommentMenu((prevMenu) => ({
      ...prevMenu,
      [commentMenuId]: !prevMenu[commentMenuId],
    }));
  };

  const handleUpdateComment = (commentId) => {
    // Implement the logic to update the comment here
  };

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem("tokenUser");

    if (!token) {
      alert("Token not found...You have not logged in...Please log in first");
      history.push("/alumni-login");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8181/delete/comment/${commentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Comment deleted successfully");
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      } else if (response.status === 401) {
        alert("You have not logged in or not the owner of the comment...");
      }
    } catch (error) {
      alert("You have not logged in or not the owner of the comment...");
    }
  };

  const [showMenu, setShowMenu] = useState(false);

  const dummyPic = "https://via.placeholder.com/150";

  const goToUserProfile = (profile) => {
    history.push({
      pathname: "/othersPerson",
      state: { person: profile },
    });
  };

  return (
    <div className="job-post" style={{ position: "relative" }}>
      <div className="menu-container">
        <button className="menu-button" onClick={handleMenuClick}>
          &#x22EE;
        </button>
        {showMenu && (
          <div className="menu">
            <button className="update" onClick={handleUpdatePost}>
              Update{" "}
            </button>
            <button className="delete" onClick={handleDeletePost}>
              Delete{" "}
            </button>
          </div>
        )}
      </div>

      {postProfile && (
        <div
          className="user-profile"
          onClick={() => goToUserProfile(postProfile)}
        >
          <div className="profile-picture">
            <img
              src={
                postProfile.profilePic
                  ? `data:image/jpeg;base64,${postProfile.profilePic}`
                  : dummyPic
              }
              alt="Profile"
            />
          </div>
          <div className="profile-info">
            <p>
              <span style={{ fontWeight: "bold", color: "#1E90FF" }}>
                {postProfile.name}
              </span>
            </p>
            <p style={{ fontWeight: "bold", color: "#000000" }}>
              {formatRelativeTime(post.postedAt)}{" "}
            </p>
          </div>
        </div>
      )}

      <h2>
        <b>{post.title}</b>
      </h2>
      <p><b>Company : </b>{post.company}</p>
      <p><b>Vacancy : </b>{post.vacancy}</p>
      <p><b>Location : </b>{post.location}</p>
      <p><b>Requirements : </b>{post.requirements}</p>
      <p><b>Responsibilities : </b>{post.responsibilities}</p>
      <p><b>Compensation : </b>{post.salary}</p>
      

      {post.images && post.images.length > 0 && (
        <div className="images" style={{ display: "flex", flexWrap: "wrap" }}>
          {post.images.map((image, index) => (
            <img
              key={index}
              src={`data:image/jpeg;base64,${image}`}
              alt={`Job post ${post.id}`}
              style={{ width: "200px", height: "120px", margin: "5px" }}
            />
          ))}
        </div>
      )}

      <button className="comments-button" onClick={handleButtonClick}>
        {showComments ? "Comment" : "Comment"}
      </button>

      <button
        className="add-comments-button"
        onClick={() => setShowAddCommentForm(true)}
      >
        Add one
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
            comments.map((comment, index) => {
              const profile = profiles[comment.commenter];
              return (
                <div key={index} className="comment-container">
                  {/* Menu container and button */}
                  <div className="menu-container">
                    <button
                      className="menu-button"
                      onClick={() => handleCommentMenuClick(index)}
                    >
                      &#x22EE;
                    </button>
                    {showCommentMenu[index] && (
                      <div className="menu">
                        <button
                          className="update"
                          onClick={() => handleUpdateComment(comment.id)}
                        >
                          Update
                        </button>
                        <button
                          className="delete"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  {/* Comment content */}
                  <div className="comment">
                    {profile && (
                      <div
                        className="user-profile"
                        onClick={() => goToUserProfile(profile)}
                      >
                        <div className="profile-info">
                          <p>
                            <span
                              style={{ fontWeight: "bold", color: "#20B2AA" }}
                            >
                              {profile.name}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
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
              );
            })
          ) : (
            <p>No comments available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default JobPost;
