

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./MyLogin.css";
import axios from "axios";
import Navbar1 from "../components/Navbar1";


function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const history = useHistory(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("tokenUser");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(
        `http://localhost:8181/public/ChangePassword?userPassword=${formData.password}`, null,
        config
      );

      //const { data } = response;
      console.log(response.data.token);

      if (response.status === 200) {
        alert("Password changed successfully...");

        history.push("/alumni-login");
      }
    } 
    catch (error) {
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <main className="login-container">
      <div style={{ width: "100%", position: "absolute", top: 0 }}>
        <Navbar1 />
      </div>
      <div className="login-content" style={{ marginTop: "60px" }}>
        <h6 className="form-title"></h6>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="hidden"
            name="_token"
            value="F5pwaZ8hSNWvzWto3DXEeUrUk3qTaZBEUq9jzyhC"
          />

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
              Set Password
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default LoginForm;
