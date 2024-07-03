import React, { useState, useEffect } from "react";
import "./ProfileEdit.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar1 from "../components/Navbar1";
//import Footer from "../components/Footer";

function LoginForm() {
  const history = useHistory();

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    passwordOfUser: "",
    profStatus: " ",
    profilePicOfUser: null,
    identityPic: null,
    studentId: "",
    YearOfGraduation: "",
  });

  const [isGraduated, setIsGraduated] = useState(false);

  const handleGraduationStatusChange = (e) => {
    const { value } = e.target;
    setIsGraduated(value === "Graduated");
    setFormData((prevFormData) => ({
      ...prevFormData,
      graduationStatus: value,
      graduationYear: "", // Reset graduation year when status changes
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const requestData = {
    userName: formData.userName,
    userEmail: formData.userEmail,
    passwordOfUser: formData.passwordOfUser,
    profStatus: formData.profStatus,
    profilePicOfUser: formData.profilePicOfUser,
    identityPic: formData.identityPic,
    studentId: formData.studentId,
    YearOfGraduation: formData.YearOfGraduation,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("tokenUser");

      if (!token) {
        alert("Token not found...You have not logged in...Please log in first");
        history.push("/alumni-login");
      }

    
      const formDataObj = new FormData();
      for (const key in formData) {
        if (formData[key] !== "") {
          formDataObj.append(key, formData[key]);
        }
      }

      const response = await axios.post(
        "http://localhost:8181/updateAcc",
        requestData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //   const response = await fetch("http://localhost:8181/updateAcc", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //     body: JSON.stringify(requestData),
      //   });

      if (response.status === 200) {
        alert("Your account is updated...");
        console.log(response.data); // Log response data
        history.push("/");
      } else if (response.status === 401) {
        alert("You have not logged in...First log in please");
        history.push("/alumni-login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main >
      <Navbar1/>
      <main className="login-container" style={{ paddingTop: "95px" }}>
        <div className="login-content">
          <h1 className="form-title">
            <b>Edit Profile</b>
          </h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Full Name"
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="passwordOfUser"
                value={formData.passwordOfUser}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>

            <div className="form-group">
              <b>Profile Picture</b>
              <input
                type="file"
                className="form-control"
                name="profilePicOfUser"
                onChange={handleChange}
                accept="image/*" // This attribute restricts the file selection to images only
              />
            </div>


            <div className="form-group">
              Professional Status
              <input
                type="text"
                className="form-control"
                name="profStatus"
                value={formData.profStatus}
                onChange={handleChange}
                
              />
            </div>



            <div className="form-group">
              <select
                className="form-control"
                name="graduationStatus"
                value={formData.graduationStatus}
                onChange={handleGraduationStatusChange}
              >
                <option value="">-- Graduation Status --</option>
                <option value="Graduated">Graduated</option>
                <option value="Non-graduated">Non-graduated</option>
              </select>
            </div>

            {isGraduated && (
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="YearOfGraduation"
                  value={formData.YearOfGraduation}
                  onChange={handleChange}
                  placeholder="Graduation Year"
                />
              </div>
            )}

            {!isGraduated && (
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="Student ID"
                />
              </div>
            )}

            <div className="form-group">
              <b>Student ID card or PVC</b>
              <input
                type="file"
                className="form-control"
                name="identityPic"
                onChange={handleChange}
                accept="image/*"
                placeholder="Identity Picture"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Update
              </button>
            </div>
          </form>
        </div>
        {/* <Footer/> */}
      </main>
    </main>
  );
}

export default LoginForm;
