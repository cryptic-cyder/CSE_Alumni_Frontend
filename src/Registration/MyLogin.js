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
      console.log(response.data.token);

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
  

    <main className="flex justify-center items-center min-h-screen">
  <div className="bg-gray-100 rounded-lg shadow-md w-full max-w-md">
    <div className="p-4">
      <h6 className="font-bold text-center text-lg mb-4">Alumni Login</h6>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="_token"
          value="F5pwaZ8hSNWvzWto3DXEeUrUk3qTaZBEUq9jzyhC"
        />
        <div>
          <label htmlFor="adminEmail" className="block"></label>
          <input
            type="text"
            id="adminEmail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input w-full"
            placeholder="Enter Email"
            required
          />
        </div>
        <div>
          <label htmlFor="adminPassword" className="block"></label>
          <input
            type="password"
            id="adminPassword"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input w-full"
            placeholder="Enter Password"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            LOGIN
          </button>
        </div>
        <div className="text-center">
          <p className="text-sm mb-1">
            <i className="bi bi-people-fill"></i> Not registered yet as alumni?{" "}
            <a
              href="/Alumni-registration"
              className="font-bold text-blue-500"
            >
              Register Here
            </a>
          </p>
        </div>
      </form>
    </div>
  </div>
</main>




  );
}

export default LoginForm;
