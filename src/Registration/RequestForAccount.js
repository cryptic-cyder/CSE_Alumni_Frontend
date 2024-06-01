import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./MyLogin.css"; // Import your custom CSS for styling
import Navbar1 from "../components/Navbar1";

const LoginForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    passwordOfUser: "",
    //profilePicOfUser: null,
    identityPic: null,
    //studentId: "",
    //YearOfGraduation: "",
    //graduationStatus: "",
  });

  // const [isGraduated, setIsGraduated] = useState(false);

  // const handleGraduationStatusChange = (e) => {
  //   const { value } = e.target;
  //   setIsGraduated(value === "Graduated");
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     graduationStatus: value,
  //     YearOfGraduation: "", // Reset graduation year when status changes
  //     studentId: "", // Reset studentId when status changes
  //   }));
  // };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObj = new FormData();
      for (const key in formData) {
        formDataObj.append(key, formData[key]);
      }

      const response = await fetch(
        "http://localhost:8181/public/requestForAccount",
        {
          method: "POST",
          body: formDataObj,
        }
      );

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log(data);
        } else {
          const text = await response.text();
          console.log(text); // Log plain text response
        }
        alert("Account is waiting for approval");
        history.push("/");
      } else if (response.status === 302) {
        alert("There is already an account with this email...Try another one");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="login-container">
      <div style={{ width: "100%", position: "absolute", top: 0 }}>
        <Navbar1 />
      </div>

      <div className="login-content">
        {/* <div className="logo-container">
          <img
            src="https://www.tbsnews.net/sites/default/files/styles/author/public/organization/logo/cuet.png"
            className="logo"
            alt="logo"
          />
        </div> */}
        <h4 className="form-title">
          <b>Alumni Registration</b>
        </h4>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Full Name"
              required
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
              required
            />
          </div>

          {/* <div className="form-group">
            <b>Profile Picture</b>
            <input
              type="file"
              className="form-control"
              name="profilePicOfUser"
              onChange={handleChange}
              accept="image/*" // This attribute restricts the file selection to images only
            />
          </div> */}

          {/* <div className="form-group">
            <select
              className="form-control"
              name="graduationStatus"
              value={formData.graduationStatus}
              onChange={handleGraduationStatusChange}
              required
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
                required
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
                required
              />
            </div>
          )} */}

          <div className="form-group">
            <b>Student ID card or PVC</b>
            <input
              type="file"
              className="form-control"
              name="identityPic"
              onChange={handleChange}
              accept="image/*"
              placeholder="Identity Picture"
              required
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">
              Register Now
            </button>
          </div>
        </form>

        <p>
          {" "}
          <center>
            Already have an alumni account?{" "}
            <a href="/alumni-login" className="contact-info">Login Here</a>
          </center>
        </p>

        <p>
          <center>
            Visit CUET <a href="https://www.cuet.ac.bd/" className="contact-info">Official Website</a>
          </center>
        </p>
      </div>
    </main>
  );
};

export default LoginForm;
