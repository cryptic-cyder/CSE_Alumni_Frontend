
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./MyLogin.css";
import axios from "axios";
import Navbar1 from "../components/Navbar1";


function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    //password: "",
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
        `http://localhost:8181/public/forgetPassword?userEmail=${formData.email}`
      );

      if (response.status === 200) {
        alert("Email sent successfully...Click the link to login ");
        localStorage.setItem("tokenUser", response.data.token);
        //history.push("/Password_Recovery");
      }
    } 
    catch (error) {
      if (error.response.status === 400) {
        alert("Something went wrong. Please try again later.");
      } 
    }
  };

  return (
    <main className="login-container">
      <div style={{ width: '100%', position: 'absolute', top: 0 }}>
        <Navbar1 />
      </div>
      <div className="login-content" style={{ marginTop: '60px' }}>
      <h6 className="form-title">Recover Password</h6>
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
              placeholder="Email"
              required
            />
          </div>
          
          <div className="form-group">
            <button type="submit" className="btn-primary">
              Send Email
            </button>
          </div>
         
        </form>
      </div>
    </main>
  );
}

export default LoginForm;
