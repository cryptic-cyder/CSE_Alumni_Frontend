import React, { useState } from "react";
import axios from "axios"; // You'll need to install axios (npm install axios)
import "./PostJobPage.css";
import { useHistory } from "react-router-dom";

const JobPostingForm = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    jobImages: [], // Change to array to store multiple images
  });

  const handleInputChange = (e) => {
    const { name, type, files, value } = e.target;

    // Handle file inputs separately
    if (type === "file") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: [...prevFormData[name], ...files], // Merge previous files with newly selected files
      }));
    } else {
      // Handle other inputs
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("description", formData.description);

    // Append each image file separately
    formData.jobImages.forEach((image) => {
      formDataObj.append("jobImages", image);
    });

    try {
      const token = localStorage.getItem("tokenUser");

      if (!token) {
        alert("Token not found...You have not logged in...Please log in first");
        history.push("/alumni-login");
        return;
      }

      const response = await axios.post(
        "http://localhost:8181/forPostingJob",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Job posted successfully");
        history.push("/Job-Arena");
      }
      else if (response.status === 401) {
        alert("Token is not valid...Please log in again...");
        history.push("/alumni-login");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Error posting job");
    }
  };

  return (
    <div className="job-form-container">
      <h2 className="form-title">Post a Job</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobImages">Images:</label>
          <input
            type="file"
            id="jobImages"
            name="jobImages"
            onChange={handleInputChange}
            multiple
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default JobPostingForm;
