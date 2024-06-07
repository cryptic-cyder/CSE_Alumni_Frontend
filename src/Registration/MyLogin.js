// const response = await axios.post(
//   `http://localhost:8181/public/UserLogin?&email=${formData.userName}&password=${formData.password}`,
//   FormData
// );

//const { data } = response;
//console.log(response.data.token);

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./MyLogin.css";
import axios from "axios";
import Navbar1 from "../components/Navbar1";

// import "bootstrap/dist/css/bootstrap.min.css";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const history = useHistory(); // Access the history object

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8181/public/UserLogin?userEmail=${formData.email}&userPassword=${formData.password}`
      );

      //const { data } = response;
      //console.log(response.data.token);

      if (response.status === 200) {
        //alert("User Login Successful");
        localStorage.setItem("tokenUser", response.data.token);
        // Redirect to job post page
        history.push("/Job-Arena");
      }
    } catch (error) {
      if (error.response.status === 404) {
        alert("Your account is not approved...After approval you can login...");
      } else if (error.response.status === 401) {
        alert("Password is incorrect. Please try again.");
      } else if (error.response.status === 403) {
        alert("Sorry!!! There is no account with this email...");
      } else if (error.response.status === 400) {
        alert("Something went wrong. Please try again later.");
      } else {
        alert("Invalid status...");
      }

      // console.error("Error:", error);
      // alert(error);
    }
  };

  return (
    <main className="login-container">
      <div style={{ width: '100%', position: 'absolute', top: 0 }}>
        <Navbar1 />
      </div>
      <div className="login-content" style={{ marginTop: '60px' }}>
        <h6 className="form-title">Alumni Login</h6>
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="hidden" name="_token" value="F5pwaZ8hSNWvzWto3DXEeUrUk3qTaZBEUq9jzyhC" />
          <div className="form-group">
            <label htmlFor="adminEmail" className="block"></label>
            <input
              type="text"
              id="adminEmail"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="adminPassword" className="block"></label>
            <input
              type="password"
              id="adminPassword"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn-primary">
              LOGIN
            </button>
          </div>

          <div className="additional-links">
            <p>
              <i className="bi bi-people-fill"></i> Forget Password?{' '}
              <a href="/forgetPass" className="contact-info">
                Click here
              </a>
            </p>
          </div>

          <div className="additional-links">
            <p>
              <i className="bi bi-people-fill"></i> Not registered yet as alumni?{' '}
              <a href="/Alumni-registration" className="contact-info">
                Register Here
              </a>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

export default LoginForm;
