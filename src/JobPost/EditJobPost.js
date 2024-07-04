import React, { useState } from "react";
import axios from "axios"; // You'll need to install axios (npm install axios)
import "./PostJobPage.css";
import { useLocation, useHistory } from 'react-router-dom';

const JobPostingForm = () => {

  const location = useLocation();
  const history = useHistory();
  const { postId } = location.state || {};

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    vacancy: "",
    location: "",
    requirements: "",
    responsibilities:"",
    salary: "",
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
    formDataObj.append("company", formData.company); 
    formDataObj.append("vacancy", formData.vacancy); 
    formDataObj.append("location", formData.location);
    formDataObj.append("requirements", formData.requirements); 
    formDataObj.append("responsibilities", formData.responsibilities); 
    formDataObj.append("salary", formData.salary);
    // Append each image file separately
    formData.jobImages.forEach((image) => {
      formDataObj.append("jobImages", image);
    });

    try {
    
      const response = await axios.post(
        `http://localhost:8181/updateJob/${postId}`,
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Post updated successfully");
        history.push("/Job-Arena");
      }
    
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Error posting job");
    }
  };

  return (
    <div className="job-form-container">
      <h2 className="form-title">Edit Post</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            
          />
        </div>



        <div className="form-group">
          <label htmlFor="company">Company :</label>
          <textarea
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="vacancy">Vacancy :</label>
          <textarea
            id="vacancy"
            name="vacancy"
            value={formData.vacancy}
            onChange={handleInputChange}
            
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location :</label>
          <textarea
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            
          />
        </div>

        <div className="form-group">
          <label htmlFor="requirements">Requirements :</label>
          <textarea
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleInputChange}
            
          />
        </div>

        <div className="form-group">
          <label htmlFor="responsibilities">Responsibilities :</label>
          <textarea
            id="responsibilities"
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleInputChange}
            
          />
        </div>

        <div className="form-group">
          <label htmlFor="salary">Compensation :</label>
          <textarea
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            
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
          Update
        </button>
      </form>
    </div>
  );
};

export default JobPostingForm;
