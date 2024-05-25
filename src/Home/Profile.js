import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar1 from "../components/Navbar1";

function Example() {
  const [person, setPerson] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("tokenUser");

      if (!token) {
        alert("Token not found...You have not logged in...Please log in first");
        history.push("/alumni-login");
      }

      const requestBody = { token };
      const response = await axios.post(
        "http://localhost:8181/fetch",
        requestBody
      );

      if (response.status === 200) {
        const data = response.data;
        setPerson(data);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access. Please log in again.");
        alert("Token is invalid. Please log in again.");
        history.push("/alumni-login");
      } else {
        console.error("Error fetching pending requests:", error);
      }
    }
  };

  const deleteAccount = async () => {
    try {
      const token = localStorage.getItem("tokenUser");

      if (!token) {
        alert("Token not found...You have not logged in...Please log in first");
        history.push("/alumni-login");
      }

      const requestBody = { token };

      const response = await axios.post(
        "http://localhost:8181/deleteAcc",
        requestBody
      );

      if (response.status === 200) {
        alert("Your account is deleted...");
        localStorage.removeItem("tokenUser");
        history.push("/Alumni-registration");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access. Please log in again.");
        alert("Token is invalid. Please log in again.");
      } else {
        console.error("Error fetching pending requests:", error);
      }
    }
  };

  const handleUserDeleteAccButton = () => {
    deleteAccount();
  };

  if (!person) {
    return <div>Loading...</div>;
  }

  const dummyPic = "https://via.placeholder.com/150";

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <Navbar1 />
      <div className="mt-8 flex justify-center items-center flex-col md:flex-row">
        <img
          className="w-36 h-36 md:w-72 md:h-72 rounded-full object-cover mr-6"
          src={
            person.profilePic
              ? `data:image/jpeg;base64,${person.profilePic}`
              : dummyPic
          }
          alt="Profile Image"
        />
      </div>

      <div >
        <center>
          <p className="text-lg text-gray-600">{person.name}</p>
        </center>
      </div>

      <div>
        <center>
          <p className="text-lg text-gray-600">{person.email}</p>
        </center>
      </div>

      <div>
        <center>
          <p className="text-lg text-gray-600">{person.profDetails}</p>
        </center>
      </div>

      <div>
        <center>
          <p className="text-lg text-gray-600">{person.studentId}</p>
        </center>
      </div>

      <div className="flex justify-center mt-4 space-x-4">
        <Link to="/edit-profile">
          <button className="px-1 py-2 bg-darkblue-500 text-white rounded-lg hover:bg-darkblue-600 transition">
            Update Profile
          </button>
        </Link>
       
          <center>
        <button
          className="px-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          onClick={handleUserDeleteAccButton}
        >
          Delete Account
        </button>
        </center>
      </div>
    </main>
  );
}

export default Example;
