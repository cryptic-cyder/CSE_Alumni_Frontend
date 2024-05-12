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

  const handleButtonClick = () => {
    setIsButtonClicked(true);
  };

  useEffect(() => {
    if (isButtonClicked) {
      fetchPendingRequests();
    }
  }, [isButtonClicked]);

  return (
    <main>
      <button onClick={handleButtonClick}>Fetch Pending Requests</button>
      {/* <button onClick={handleLogout}>Admin Logout</button> */}
      {isButtonClicked && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  image
                </th>

                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
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
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Default
                    </button>
                    <button
                      type="button"
                      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Red
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
