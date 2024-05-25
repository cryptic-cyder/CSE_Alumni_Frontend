// const response = await fetch(
//   `http://localhost:8181/public/adminLogin?email=${formData.email}&password=${formData.password}`,
//   {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//   }
// );

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//import "./MyLogin.css";
import axios from "axios";

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
        `http://localhost:8181/public/adminLogin?email=${formData.email}&password=${formData.password}`,
        FormData
      );

      //const { data } = response;
      console.log(response.data.token);

      if (response.status === 200) {
        console.log("Login Successful");
        localStorage.setItem("token", response.data.token);
        history.push("/PendingRequestsPage"); // Redirect to job post page
      } else {
        console.error("Invalid content type");
        alert("Invalid content type received. Please try again later.");
      }
    } catch (error) {
      alert("Your email or password is incorrect...");
    }
  };

  return (
    
<main className="d-flex justify-content-center align-items-center min-vh-100">
  <div className="col-md-6">
    <div className="card">
      <div className="card-body">
        <h6
          style={{
            fontWeight: "bold",
            marginTop: "10px",
            marginBottom: "20px",
            textAlign: "center",
            fontSize: "20px",
          }}
        >
          Admin Login
        </h6>
        <form
          className="row g-3 form-prevent"
          onSubmit={handleSubmit} // Add onSubmit handler
        >
          <input
            type="hidden"
            name="_token"
            value="F5pwaZ8hSNWvzWto3DXEeUrUk3qTaZBEUq9jzyhC"
          />

          <div className="col-12">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter userEmail"
                required
              />
              <label htmlFor="userName"> Admin userEmail</label>
            </div>
          </div>

          <div className="col-12">
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="col-12">
            <button
              className="btn btn-primary w-100 form-prevent-multiple-submit"
              type="submit"
              style={{
                background: "#1D45B5",
                border: "1px solid #1D45B5",
              }}
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</main>


  );
}

export default LoginForm;
