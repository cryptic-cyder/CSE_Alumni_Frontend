import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; // Import useHistory hook
import { Link } from "react-router-dom";

function Example() {
  
  const [person, setPerson] = useState(null); // State to hold the person's data
  const history = useHistory();

  useEffect(() => {
    // Fetch data from backend API when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("tokenUser");

      if (!token) {
        console.error("Token not found");
        return;
      }

      const requestBody = { token };
      const response = await axios.post(
        "http://localhost:8181/fetch",
        requestBody
      );

      if (response.status === 200) {
        const data = response.data;
        // Assuming the backend returns only one person's profile
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
        console.error("Token not found");
        return;
      }

      const requestBody = { token };

      const response = await axios.post(
        "http://localhost:8181/deleteAcc",
        requestBody
      );

      if (response.status === 200) {
        alert("Your account is deleted...");
        localStorage.removeItem("tokenUser");
        history.push("/PendingRequestsPage");
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

  // Render loading state if person data is not yet fetched
  if (!person) {
    return <div>Loading...</div>;
  }

  return (
   
<main>
      <div className="dark:bg-gray-800">
        <div className="flex justify-between gap-x-6 py-5 dark:text-white">
          <div className="flex min-w-0 gap-x-4">
            <img
              className="w-10 h-10 rounded-full"
              src={`data:image/jpeg;base64,${person.profilePic}`}
              alt="Profile Image"
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {person.name}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {person.email}
              </p>
            </div>
          </div>
        </div>


        <div className="small mb-0">
        {/* <i className="bi bi-people-fill"></i> Edit profile{" "} */}
        <Link to="/edit-profile" className="font-weight-bold base-color">
          <button>Update Profile</button>
        </Link>
      </div>

        <button
          className="logout-button"
          onClick={handleUserDeleteAccButton}
        >
          Delete Account
        </button>
      </div>
    </main>

  );
}

export default Example;
