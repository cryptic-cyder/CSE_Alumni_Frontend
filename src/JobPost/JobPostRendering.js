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
      console.error("Token not found");
      return;
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
      setComments(response.data);
      setShowComments(true); // Show comments after fetching them
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
      console.error("Token not found");
      return;
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
      }
      else if(response.status===401){
        alert("Your token is expired...Please log in first...");
        history.push("/alumni-login");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="job-post">
      {/* <h2>{post.id}</h2> */}
      <h2>
        <b>{post.title}</b>
      </h2>
      <p>{post.description}</p>

      {post.images && post.images.length > 0 && (
        <div className="images">
          {post.images.map((image, index) => (
            <img
              key={index}
              src={`data:image/jpeg;base64,${image}`}
              alt={`Job post ${post.id}`}
              style={{ width: "400px", height: "200px" }} // Adjust width and height as needed
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
        <>
          {Array.isArray(comments) && comments.length > 0 ? (
            <div className="comments">
              {comments.map((comment, index) => (
                <div key={index} className="comment">
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
              ))}
            </div>
          ) : (
            <p>No comments available</p>
          )}
        </>
      )}
    </div>
  );
};

export default JobPost;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { pdfjs } from 'react-pdf';
// import PdfComp from '../components/PdfRender';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

// const JobPost = ({ post }) => {
//   const [pdfData, setPdfData] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [showComments, setShowComments] = useState(false);

//   useEffect(() => {
//     console.log('Post data:', post);
//   }, [post]);

//   const handleViewResume = (resumeBytes) => {
//     try {
//       // Create a Blob from the byte array
//       const blob = new Blob([resumeBytes], { type: 'application/pdf' });

//       // Set PDF data for iframe
//       setPdfData(URL.createObjectURL(blob));
//     } catch (error) {
//       console.error('Error opening resume:', error);
//       alert('Failed to open the resume.');
//     }
//   };

//   const fetchComments = async () => {
//     try {
//       const response = await axios.post(`http://localhost:8181//fetch/allCommentOfAnyPost/${post.id}`);
//       setComments(response.data);
//       setShowComments(true); // Show comments after fetching them
//     } catch (error) {
//       console.error('Error fetching comments:', error);
//     }
//   };

//   const handleButtonClick = async () => {
//     // Fetch comments when the button is clicked
//     fetchComments();
//   };

//   return (
//     <div className="job-post">
//       <h2>{post.id}</h2>
//       <h2>{post.title}</h2>
//       <p>{post.description}</p>

//       {post.images && post.images.length > 0 && (
//         <div className="images">
//           {post.images.map((image, index) => (
//             <img
//               key={index}
//               src={`data:image/jpeg;base64,${image}`}
//               alt={`Job post ${post.id}`}
//               style={{ width: '400px', height: '200px' }} // Adjust width and height as needed
//             />
//           ))}
//         </div>
//       )}

//       <button onClick={handleButtonClick}>See Comments</button>

//       {showComments && (
//         <>
//           {Array.isArray(comments) && comments.length > 0 ? (
//             <div className="comments">
//               {comments.map((comment, index) => (
//                 <div key={index} className="comment">
//                   {comment.textContent && <p>{comment.textContent}</p>}
//                   {comment.resumeBytes && (
//                     <div className="resume">
//                       <p>Resume: {comment.resume}</p>
//                       <button onClick={() => handleViewResume(comment.resumeBytes)}>
//                         View Resume

//                         <PdfComp pdf={comment.resume}/>
//                       </button>
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

//       {pdfData && (
//         <div className="pdf-viewer">
//           <iframe src={pdfData} width="600" height="800" title="PDF Viewer"></iframe>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobPost;
