import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <p>{comment.text}</p>
      {comment.file && (
        <div className="file">
          <a href={comment.file.url} target="_blank" rel="noopener noreferrer">
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default Comment;
