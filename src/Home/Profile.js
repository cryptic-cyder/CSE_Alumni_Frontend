// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import Navbar1 from "../components/Navbar1";
// import Footer from "../components/Footer";

// function Example() {
//   const [person, setPerson] = useState(null);
//   const history = useHistory();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const MyJobPosts = async () => {
//     history.push("/my-job-posts");
//   };

//   const fetchData = async () => {
//     try {
//       const token = localStorage.getItem("tokenUser");

//       if (!token) {
//         alert("Token not found...You have not logged in...Please log in first");
//         history.push("/alumni-login");
//       }

//       const requestBody = { token };
//       const response = await axios.post(
//         "http://localhost:8181/fetch",
//         requestBody
//       );

//       if (response.status === 200) {
//         const data = response.data;
//         setPerson(data);
//       } else {
//         console.error("Unexpected response status:", response.status);
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         console.error("Unauthorized access. Please log in again.");
//         alert("Token is invalid. Please log in again.");
//         history.push("/alumni-login");
//       } else {
//         console.error("Error fetching pending requests:", error);
//       }
//     }
//   };

//   const userLogOut = async () => {
//     try {
//       const token = localStorage.getItem("tokenUser");

//       if (!token) {
//         alert("Token not found...You have not logged in...Please log in first");
//         history.push("/alumni-login");
//       }

//       const requestBody = { token };

//       const response = await axios.post(
//         "http://localhost:8181/UserLogout",
//         requestBody
//       );

//       if (response.status === 200) {
//         alert("Successfully logout");
//         localStorage.removeItem("tokenUser");
//         history.push("/alumni-login");
//       } else {
//         console.error("Unexpected response status:", response.status);
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         console.error("Unauthorized access. Please log in again.");
//         alert("Token is invalid. Please log in again.");
//         history.push("/alumni-login");
//       } else {
//         console.error("Error fetching pending requests:", error);
//       }
//     }
//   };

//   const deleteAccount = async () => {
//     try {
//       const token = localStorage.getItem("tokenUser");

//       if (!token) {
//         alert("Token not found...You have not logged in...Please log in first");
//         history.push("/alumni-login");
//       }

//       const requestBody = { token };

//       const response = await axios.post(
//         "http://localhost:8181/deleteAcc",
//         requestBody
//       );

//       if (response.status === 200) {
//         alert("Your account is deleted...");
//         localStorage.removeItem("tokenUser");
//         history.push("/Alumni-registration");
//       } else {
//         console.error("Unexpected response status:", response.status);
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         console.error("Unauthorized access. Please log in again.");
//         alert("Token is invalid. Please log in again.");
//       } else {
//         console.error("Error fetching pending requests:", error);
//       }
//     }
//   };

//   if (!person) {
//     return <div>Loading...</div>;
//   }

//   const dummyPic = "https://via.placeholder.com/150";

//   return (

//     <main className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
//       <Navbar1 />

//       <div className="flex justify-center mb-8">
//         <div className="flex">
//           {/* My Posts Button */}
//           <button
//             style={{
//               backgroundColor: "green",
//               border: "none",
//               borderRadius: "5px",
//               color: "white",
//               padding: "10px 20px",
//               cursor: "pointer",
//               fontSize: "16px",
//               transition: "transform 0.2s, box-shadow 0.2s",
//               margin: "0",
//             }}
//             onClick={MyJobPosts}
//           >
//             My Posts
//           </button>

//           {/* Update Profile Button */}
//           <button
//             style={{
//               backgroundColor: "blue",
//               border: "none",
//               borderRadius: "5px",
//               color: "white",
//               padding: "10px 20px",
//               cursor: "pointer",
//               fontSize: "16px",
//               transition: "transform 0.2s, box-shadow 0.2s",
//               margin: "0",
//             }}
//             onClick={() => {
//               window.location.href = "/edit-profile";
//             }}
//           >
//             Update Profile
//           </button>

//           {/* User Logout Button */}
//           <button
//             style={{
//               backgroundColor: "green",
//               border: "none",
//               borderRadius: "5px",
//               color: "white",
//               padding: "10px 20px",
//               cursor: "pointer",
//               fontSize: "16px",
//               transition: "transform 0.2s, box-shadow 0.2s",
//               margin: "0",
//             }}
//             onClick={userLogOut}
//           >
//             User Logout
//           </button>

//           {/* Delete Account Button */}
//           <button
//             style={{
//               backgroundColor: "red",
//               border: "none",
//               borderRadius: "5px",
//               color: "white",
//               padding: "10px 20px",
//               cursor: "pointer",
//               fontSize: "16px",
//               transition: "transform 0.2s, box-shadow 0.2s",
//               margin: "0",
//             }}
//             onClick={() => {
//               const confirmDelete = window.confirm(
//                 "Are you sure you want to delete your account?"
//               );
//               if (confirmDelete) {
//                 deleteAccount();
//               }
//             }}
//           >
//             Delete Profile
//           </button>
//         </div>
//       </div>

//       {/* Profile Picture */}
//       <div className="container mx-auto mb-1">
//         <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-2">
//           <div className="flex justify-center mb-4">
//             <img
//               className="w-36 h-36 md:w-72 md:h-72 rounded-full object-cover"
//               src={
//                 person.profilePic
//                   ? `data:image/jpeg;base64,${person.profilePic}`
//                   : dummyPic
//               }
//               alt="Profile Image"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Profile Information */}
//       <div className="container mx-auto mb-1">
//         <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-2">
//           <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
//           <div>
//             <p className="text-gray-600 mb-2">
//               <span className="font-bold">Name:</span> {person.name}
//             </p>
//             <p className="text-gray-600 mb-2">
//               <span className="font-bold">Email:</span> {person.email}
//             </p>
//             <p className="text-gray-600 mb-2">
//               <span className="font-bold">Profession Details:</span>{" "}
//               {person.profDetails}
//             </p>
//             <p className="text-gray-600 mb-2">
//               <span className="font-bold">Student ID:</span> {person.studentId}
//             </p>
//           </div>
//         </div>
//       </div>
//       <Footer/>
//     </main>
//   );
// }

// export default Example;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";

function Profile() {
  const [person, setPerson] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  // const MyJobPosts = () => {
  //   history.push("/my-job-posts");
  // };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("tokenUser");

      if (!token) {
        alert("Token not found...You have not logged in...Please log in first");
        history.push("/alumni-login");
        return;
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

  // const userLogOut = async () => {
  //   try {
  //     const token = localStorage.getItem("tokenUser");

  //     if (!token) {
  //       alert("Token not found...You have not logged in...Please log in first");
  //       history.push("/alumni-login");
  //       return;
  //     }

  //     const requestBody = { token };

  //     const response = await axios.post(
  //       "http://localhost:8181/UserLogout",
  //       requestBody
  //     );

  //     if (response.status === 200) {
  //       alert("Successfully logout");
  //       localStorage.removeItem("tokenUser");
  //       history.push("/alumni-login");
  //     } else {
  //       console.error("Unexpected response status:", response.status);
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       console.error("Unauthorized access. Please log in again.");
  //       alert("Token is invalid. Please log in again.");
  //       history.push("/alumni-login");
  //     } else {
  //       console.error("Error fetching pending requests:", error);
  //     }
  //   }
  // };

  // const deleteAccount = async () => {
  //   try {
  //     const token = localStorage.getItem("tokenUser");

  //     if (!token) {
  //       alert("Token not found...You have not logged in...Please log in first");
  //       history.push("/alumni-login");
  //       return;
  //     }

  //     const requestBody = { token };

  //     const response = await axios.post(
  //       "http://localhost:8181/deleteAcc",
  //       requestBody
  //     );

  //     if (response.status === 200) {
  //       alert("Your account is deleted...");
  //       localStorage.removeItem("tokenUser");
  //       history.push("/Alumni-registration");
  //     } else {
  //       console.error("Unexpected response status:", response.status);
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       console.error("Unauthorized access. Please log in again.");
  //       alert("Token is invalid. Please log in again.");
  //     } else {
  //       console.error("Error fetching pending requests:", error);
  //     }
  //   }
  // };

  if (!person) {
    return <div>Loading...</div>;
  }

  const dummyPic = "https://via.placeholder.com/150";

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <Navbar1 />
      <div className="container mx-auto">
        {/* <div className="flex justify-center mb-8">
          <div className="grid grid-cols-2 gap-4">
            <button className="btn-primary" onClick={MyJobPosts}>
              My Posts
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                window.location.href = "/edit-profile";
              }}
            >
              Update Profile
            </button>
            <button className="btn-primary" onClick={userLogOut}>
              User Logout
            </button>
            <button
              className="btn-danger"
              onClick={() => {
                const confirmDelete = window.confirm(
                  "Are you sure you want to delete your account?"
                );
                if (confirmDelete) {
                  deleteAccount();
                }
              }}
            >
              Delete Profile
            </button>
          </div>
        </div> */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-4">
          <div className="flex justify-center mb-4">
            <img
              className="w-36 h-36 md:w-72 md:h-72 rounded-full object-cover"
              src={
                person.profilePic
                  ? `data:image/jpeg;base64,${person.profilePic}`
                  : dummyPic
              }
              alt="Profile"
            />
          </div>
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold">{person.name}</h2>
            <p className="text-gray-600">{person.profDetails}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Email:</span> {person.email}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Profession Details:</span>{" "}
              {person.profDetails}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Student ID:</span> {person.studentId}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Profile;
