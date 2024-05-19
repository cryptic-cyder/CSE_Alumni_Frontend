import React, { useState } from 'react';

const JobPost = ({ post }) => {
  const [pdfData, setPdfData] = useState(null);

  const handleViewResume = (decodedResume, filename) => {
    try {
      console.log('Decoded Resume Base64:', decodedResume);

      // Decode base64 string to binary data
      const byteCharacters = atob(decodedResume);
      const byteArray = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      // Set PDF data
      setPdfData(URL.createObjectURL(blob));

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename; // Set the filename for the downloaded file
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up by removing the link element
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error opening resume:', error);
      alert('Failed to open the resume.');
    }
  };

  return (
    <div className="job-post">
      <h2>{post.title}</h2>
      <p>{post.description}</p>

      {post.decodedImages && post.decodedImages.length > 0 && (
        <div className="images">
          {post.decodedImages.map((decodedImage, index) => (
            <img
              key={index}
              src={`data:image/jpeg;base64,${decodedImage}`}
              alt={`Job post ${post.id}`}
              style={{ width: '400px', height: '200px' }} // Adjust width and height as needed
            />
          ))}
        </div>
      )}

      {Array.isArray(post.comments) && post.comments.length > 0 && (
        <div className="comments">
          <h3>Comments:</h3>
          {post.comments.map((comment, index) => (
            <div key={index} className="comment">
              {comment.textContent && <p>{comment.textContent}</p>}
              {comment.decodedResume && (
                <div className="resume">
                  <button onClick={() => handleViewResume(comment.decodedResume, 'resume.pdf')}>
                    View Resume
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobPost;
