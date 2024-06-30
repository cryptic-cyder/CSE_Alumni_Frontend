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


































// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import Navbar1 from "../components/Navbar1";
// import Footer from "../components/Footer";

// function Profile() {
//   const [person, setPerson] = useState(null);
//   const history = useHistory();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // const MyJobPosts = () => {
//   //   history.push("/my-job-posts");
//   // };

//   const fetchData = async () => {
//     try {
//       const token = localStorage.getItem("tokenUser");

//       if (!token) {
//         alert("Token not found...You have not logged in...Please log in first");
//         history.push("/alumni-login");
//         return;
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

 
//   if (!person) {
//     return <div>Loading...</div>;
//   }
  
//   const dummyPic = "https://via.placeholder.com/150";
  
//   return (
//     <main className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
//       <Navbar1 />
//       <div className="container mx-auto flex-grow">
//         {/* <div className="flex justify-center mb-8">
//           <div className="grid grid-cols-2 gap-4">
//             <button className="btn-primary" onClick={MyJobPosts}>
//               My Posts
//             </button>
//             <button
//               className="btn-primary"
//               onClick={() => {
//                 window.location.href = "/edit-profile";
//               }}
//             >
//               Update Profile
//             </button>
//             <button className="btn-primary" onClick={userLogOut}>
//               User Logout
//             </button>
//             <button
//               className="btn-danger"
//               onClick={() => {
//                 const confirmDelete = window.confirm(
//                   "Are you sure you want to delete your account?"
//                 );
//                 if (confirmDelete) {
//                   deleteAccount();
//                 }
//               }}
//             >
//               Delete Profile
//             </button>
//           </div>
//         </div> */}
//         <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-4">
//           <div className="flex justify-center mb-4">
//             <img
//               className="w-36 h-36 md:w-72 md:h-72 rounded-full object-cover"
//               src={
//                 person.profilePic
//                   ? `data:image/jpeg;base64,${person.profilePic}`
//                   : dummyPic
//               }
//               alt="Profile"
//             />
//           </div>
//           <div className="text-center mb-4">
//             <h2 className="text-xl font-semibold">{person.name}</h2>
//             <p className="text-gray-600">{person.profDetails}</p>
//           </div>
//           <div className="text-center">
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
//       <Footer />
//     </main>
//   );

// }

// export default Profile;





import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";
import "./ProfileEdit.css";

function ProfileEdit() {
  const [person, setPerson] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    passwordOfUser: "",
    profStatus: "",
    profilePicOfUser: null,
    identityPic: null,
    studentId: "",
    YearOfGraduation: "",
    graduationStatus: "",
  });
  const [isGraduated, setIsGraduated] = useState(false);
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
        setFormData({
          userName: data.name,
          userEmail: data.email,
          profStatus: data.profDetails,
          studentId: data.studentId,
          YearOfGraduation: data.graduationYear || "",
          graduationStatus: data.graduated ? "Graduated" : "Non-graduated",
        });
        setIsGraduated(data.graduated);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access. Please log in again.");
        alert("Token is invalid. Please log in again.");
        history.push("/alumni-login");
      } else {
        console.error("Error fetching profile:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleGraduationStatusChange = (e) => {
    const { value } = e.target;
    setIsGraduated(value === "Graduated");
    setFormData((prevFormData) => ({
      ...prevFormData,
      graduationStatus: value,
      YearOfGraduation: "", // Reset graduation year when status changes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("tokenUser");

      if (!token) {
        alert("Token not found...You have not logged in...Please log in first");
        history.push("/alumni-login");
        return;
      }

      const formDataObj = new FormData();
      for (const key in formData) {
        if (formData[key] !== "") {
          formDataObj.append(key, formData[key]);
        }
      }

      const response = await axios.post(
        "http://localhost:8181/updateAcc",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Your account is updated successfully.");
        history.push("/");
      } else {
        console.error("Unexpected response status:", response.status);
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (!person) {
    return <div>Loading...</div>;
  }

  const dummyPic = "https://via.placeholder.com/150";

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Navbar1 />
      <div className="mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Half for Profile Rendering */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
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
        {/* Right Half for Edit Profile */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
          <h1 className="form-title mb-4">
            <b>Edit Profile</b>
          </h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Full Name"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="passwordOfUser"
                value={formData.passwordOfUser}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <b>Profile Picture</b>
              <input
                type="file"
                className="form-control"
                name="profilePicOfUser"
                onChange={handleChange}
                accept="image/*"
              />
            </div>
            <div className="form-group">
              Professional Status
              <input
                type="text"
                className="form-control"
                name="profStatus"
                value={formData.profStatus}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <select
                className="form-control"
                name="graduationStatus"
                value={formData.graduationStatus}
                onChange={handleGraduationStatusChange}
              >
                <option value="">-- Graduation Status --</option>
                <option value="Graduated">Graduated</option>
                <option value="Non-graduated">Non-graduated</option>
              </select>
            </div>
            {isGraduated && (
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="YearOfGraduation"
                  value={formData.YearOfGraduation}
                  onChange={handleChange}
                  placeholder="Graduation Year"
                />
              </div>
            )}
            {!isGraduated && (
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="Student ID"
                />
              </div>
            )}
            <div className="form-group">
              <b>Student ID card or PVC</b>
              <input
                type="file"
                className="form-control"
                name="identityPic"
                onChange={handleChange}
                accept="image/*"
                placeholder="Identity Picture"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default ProfileEdit;
