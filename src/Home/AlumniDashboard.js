import React, { useState, useEffect } from "react";
import axios from "axios";

function Example() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    // Fetch data from backend API when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8181/public/fetch/allRegisteredAcc"
      );

      if (response.status === 200) {
        const data = response.data;
        setPeople(data);
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

  return (
    <div className="dark:bg-gray-800">
     

      <ul role="list" className="dark:divide-gray-700 divide-y divide-gray-100">
        {people.map((person) => (
          <li
            key={person.email}
            className="flex justify-between gap-x-6 py-5 dark:text-white"
          >
            <div className="flex min-w-0 gap-x-4">
              <img
                className="w-10 h-10 rounded-full"
                src={`data:image/jpeg;base64,${person.profilePic}`}
                alt="Jese image"
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

            {/* <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{person.role}</p>
              {person.lastSeen ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Online</p>
                </div>
              )}
            </div> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Example;
