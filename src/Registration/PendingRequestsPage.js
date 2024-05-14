//   const config = {
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// };

// const externalApiUrlResponse = await fetch("http://localhost:8181/pendingRequests");
// if (!externalApiUrlResponse.ok) {
//   console.error("Failed to fetch external API URL");
//   return;
// }
// const externalApiUrl = await externalApiUrlResponse.text();

//console.log("Response status:", response.status);
// console.log("Response headers:", response.headers);

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./PedningRequests.css";
import axios from "axios";

function AdminLogin() {
  const [pendingRequests, setPendingRequests] = useState([]); // Define pendingRequests state
  const [isButtonClicked, setIsButtonClicked] = useState(false); // Define isButtonClicked state
  const history = useHistory();

  const fetchPendingRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found");
        return;
      }

      const requestBody = { token };

      const response = await axios.post(
        "http://localhost:8181/pendingRequests",
        requestBody
      );

      if (response.status === 200) {
        const data = response.data;
        setPendingRequests(data);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access. Please log in again.");
        alert("Token is invalid. Please log in again.");

        history.push("/admin-login");
      } else {
        console.error("Error fetching pending requests:", error);
      }
    }
  };

  const adminLogOut = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found");
        return;
      }

      const requestBody = { token };

      const response = await axios.post(
        "http://localhost:8181/adminLogout",
        requestBody
      );

      if (response.status === 200) {
        alert("Successfully logout as admin");
        history.push("/admin-login");
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

  const handleImageClick = () => {
    history.push("/identityPicture");
  };

  const handleButtonClick = () => {
    setIsButtonClicked(true);
  };

  const handleAdminLogOutButton = () => {
    adminLogOut();
  };

  const handleAcceptRequest = async (studentEmail) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found");
        return;
      }

      const requestBody = { token, studentEmail };

      const response = await axios.post(
        `http://localhost:8181/approveAcc/${studentEmail}`,
        requestBody
      );

      if (response.status === 200) {
        // Request accepted, remove the item from pendingRequests state
        setPendingRequests((prevPendingRequests) =>
          prevPendingRequests.filter(
            (request) => request.studentEmail !== studentEmail
          )
        );
        alert("Request Accepted...");
      } else if (response.status === 400) {
        alert("Token is invalid. Please log in again.");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleRejectRequest = async (studentEmail) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found");
        return;
      }

      const requestBody = { token, studentEmail };

      const response = await axios.post(
        `http://localhost:8181/rejectAcc/${studentEmail}`,
        requestBody
      );

      if (response.status === 200) {
        // Request accepted, remove the item from pendingRequests state
        setPendingRequests((prevPendingRequests) =>
          prevPendingRequests.filter(
            (request) => request.studentEmail !== studentEmail
          )
        );
        alert("Request Rejected...");
      } else if (response.status === 400) {
        alert("Token is invalid. Please log in again.");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  useEffect(() => {
    if (isButtonClicked) {
      fetchPendingRequests();
    }
  }, [isButtonClicked]);

  return (
    <main>
      <h1>Admin Dashboard</h1>
      <div className="admin-header">
        <button className="logout-button" onClick={handleAdminLogOutButton}>
          Admin Logout
        </button>
      </div>
      <div className="fetch-buttons-container">
        <button className="fetch-buttons" onClick={handleButtonClick}>
          Fetch Pending Requests
        </button>
      </div>

      HomePage??
      <a href="/Home">
        <span className="font-weight-bold base-color">Click Here</span>
      </a>
      <br />
      
      {isButtonClicked && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  profile Picture
                </th>

                <th scope="col" className="px-6 py-3">
                  Student ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Graduation Year
                </th>
                <th scope="col" className="px-6 py-3">
                  Identity
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {pendingRequests.map((user) => (
              <tbody>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={`data:image/jpeg;base64,${user.profilePic}`}
                      alt="Jese image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">{user.name}</div>
                      <div className="font-normal text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </th>

                  <td className="px-6 py-4">{user.studentId}</td>
                  <td className="px-6 py-4">{user.graduationYear}</td>

                  <td>
                    <a
                      href={`data:image/jpeg;base64,${user.identity}`}
                      download="user_image.jpg"
                    >
                      <img
                        className="w-20 h-20 rounded-full cursor-pointer"
                        src={`data:image/jpeg;base64,${user.identity}`}
                        alt="User Image"
                      />
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 shadow-lg"
                      onClick={() => handleAcceptRequest(user.email)}
                    >
                      Accept
                    </button>

                    <button
                      type="button"
                      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={() => handleRejectRequest(user.email)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </main>
  );
}

export default AdminLogin;
