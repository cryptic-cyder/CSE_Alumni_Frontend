// // src/components/Navbar1.js

// import React from "react";
// import styled from "styled-components";
// import { Link, useHistory } from "react-router-dom"; // Import Link for routing
// import axios from "axios";

// const NavbarContainer = styled.nav`
//   background-color: #304b5b; /* Lighter deep ocean blue background */
//   color: #c8dce6; /* Lighter cyan text color */
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1rem 2rem;
//   width: 100%;
//   height: 80px;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
// `;

// const Logo = styled.div`
//   font-size: 1.5rem;
//   img {
//     height: 70px; /* Adjust height as needed */
//     width: 70px; /* Maintain aspect ratio */
//   }
// `;

// const LogoText = styled.span`
//   margin-left: 20rem; /* Adjust spacing between logo and text */
//   font-weight: bold; /* Make text bold */
//   color: white; /* Set text color to white */
//   font-size: 2.2rem; /* Increase font size */
// `;

// const NavLinks = styled.ul`
//   list-style-type: none;
//   display: flex;
//   align-items: center; /* Align items vertically */
//   padding: 0;
//   margin: 0;
// `;

// const NavLinkItem = styled.li`
//   margin-left: 1rem; /* Adjust spacing between navigation links */
// `;

// const NavLink = styled(Link)`
//   text-decoration: none;
//   color: white;
//   transition: color 0.3s ease;

//   &:hover {
//     color: lightgray;
//   }
// `;

// const Navbar1 = () => {
//   const history = useHistory();

//   const validateToken = async () => {
//     const token = localStorage.getItem("tokenUser");

//     if (!token) {
//       alert("Token not found...You have not logged in...Please log in first");
//       history.push("/alumni-login");
//     }

//     try {
//       const requestBody = { token };
//       const response = await axios.post(
//         "http://localhost:8181/public/tokenValidation",
//         requestBody
//       );

//       if (response.status === 200) {
//         history.push("/Job-Arena");
//       } else {
//         alert("Token is invalid...Please log in again.");
//         history.push("/alumni-login");
//       }
//     } catch (error) {
//       console.error("Error validating token:", error);
//       alert("An error occurred while validating the token. Please try again.");
//       history.push("/alumni-login");
//     }
//   };

//   const validateAdmin = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Token not found...You have not logged in...Please log in first");
//       history.push("/admin-login");
//     }

//     try {
//       const requestBody = { token };
//       const response = await axios.post(
//         "http://localhost:8181/public/tokenValidation",
//         requestBody
//       );

//       if (response.status === 200) {
//         history.push("/PendingRequestsPage");
//       } else {
//         alert("Token is invalid...Please log in again.");
//         history.push("/admin-login");
//       }
//     } catch (error) {
//       console.error("Error validating token:", error);
//       alert("An error occurred while validating the token. Please try again.");
//       history.push("/admin-login");
//     }
//   };

//   const validateForProfile = async () => {
//     const token = localStorage.getItem("tokenUser");

//     if (!token) {
//       alert("Token not found...You have not logged in...Please log in first");
//       history.push("/alumni-login");
//     }

//     try {
//       const requestBody = { token };
//       const response = await axios.post(
//         "http://localhost:8181/public/tokenValidation",
//         requestBody
//       );

//       if (response.status === 200) {
//         history.push("/User-Profile");
//       } else {
//         alert("Token is invalid...Please log in again.");
//         history.push("/alumni-login");
//       }
//     } catch (error) {
//       console.error("Error validating token:", error);
//       alert("An error occurred while validating the token. Please try again.");
//       history.push("/alumni-login");
//     }
//   };

//   return (
//     <NavbarContainer>

//       <Logo>
//         <img
//           src="https://www.cuet.ac.bd/frontend/images/cuetlogo.png"
//           alt="Logo"

//         />

//       </Logo>
//       <LogoText>CUET CSE</LogoText>
//       <NavLinks>
//         <NavLinkItem>
//           <NavLink to="/">Home</NavLink>
//         </NavLinkItem>
//         <NavLinkItem>
//           <NavLink to="/Register">Register</NavLink>
//         </NavLinkItem>
//         <NavLinkItem>
//           <NavLink to="/Job-Arena" onClick={validateToken}>
//             JobSection
//           </NavLink>
//         </NavLinkItem>
//         <NavLinkItem>
//           <NavLink to="/User-Profile" onClick={validateForProfile}>
//             Profile
//           </NavLink>
//         </NavLinkItem>
//         <NavLinkItem>
//           <NavLink to="/admin-login" onClick={validateAdmin}>
//             Admin
//           </NavLink>
//         </NavLinkItem>
//         <NavLinkItem>
//           <NavLink to="/">About</NavLink>
//         </NavLinkItem>

//         {/* Add more NavLinkItems for additional options */}
//       </NavLinks>
//     </NavbarContainer>
//   );
// };

// export default Navbar1;

// src/components/Navbar1.js

  // const validateAdmin = async () => {
  //   setShowAdminDropdown(!showAdminDropdown); 

  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     alert("Token not found...You have not logged in...Please log in first");
  //     history.push("/admin-login");
  //   }

  //   try {
  //     const requestBody = { token };
  //     const response = await axios.post(
  //       "http://localhost:8181/public/tokenValidation",
  //       requestBody
  //     );

  //     if (response.status === 200) {
  //       history.push("/PendingRequestsPage");
  //     } else {
  //       alert("Token is invalid...Please log in again.");
  //       history.push("/admin-login");
  //     }
  //   } catch (error) {
  //     console.error("Error validating token:", error);
  //     alert("An error occurred while validating the token. Please try again.");
  //     history.push("/admin-login");
  //   }
  // };

  
  // const validateForProfile = async () => {
   
  //   const token = localStorage.getItem("tokenUser");

  //   if (!token) {
  //     alert("Token not found...You have not logged in...Please log in first");
  //     history.push("/alumni-login");
  //   }

  //   try {
  //     const requestBody = { token };
  //     const response = await axios.post(
  //       "http://localhost:8181/public/tokenValidation",
  //       requestBody
  //     );

  //     if (response.status === 200) {
  //       history.push("/User-Profile");
  //     } else {
  //       alert("Token is invalid...Please log in again.");
  //       history.push("/alumni-login");
  //     }
  //   } catch (error) {
  //     console.error("Error validating token:", error);
  //     alert("An error occurred while validating the token. Please try again.");
  //     history.push("/alumni-login");
  //   }

  // };


import {useEffect, useRef } from "react"; 
import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";





const NavbarContainer = styled.nav`
  background-color: #2c3e50; /* Deep ocean blue background */
  color: #ecf0f1; /* Lighter cyan text color */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  width: 100%;
  height: 80px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  img {
    height: 70px; /* Adjust height as needed */
    width: 70px; /* Maintain aspect ratio */
  }
`;

const LogoText = styled.span`
  margin-left: 20rem; /* Adjust spacing between logo and text */
  font-weight: bold; /* Make text bold */
  color: white; /* Set text color to white */
  font-size: 2.2rem; /* Increase font size */
`;

const NavLinks = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center; /* Align items vertically */
  padding: 0;
  margin: 0;
`;

const NavLinkItem = styled.li`
  margin-left: 1rem; /* Adjust spacing between navigation links */
  position: relative; /* Add position relative to NavLinkItem */
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  transition: color 0.3s ease;

  &:hover {
    color: #f39c12;
  }
`;

const DropdownMenu = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: #2c3e50; /* Set background color */
  border: 1px solid #ecf0f1; /* Border color */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px; /* Adjust width as needed */
  display: ${(props) => (props.show ? "block" : "none")};
  z-index: 1000;
`;

const DropdownItem = styled.li`
  padding: 0.5rem 1rem;

  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
  border-bottom: 1px solid #ecf0f1; /* Add border bottom between items */
  background-color: ${(props) =>
    props.profile
      ? "#2c3e50"
      : "transparent"}; /* Set background color based on profile prop */
  color: ${(props) =>
    props.profile
      ? "#ecf0f1"
      : "inherit"}; /* Set text color based on profile prop */

  &:hover {
    background-color: #2c3e50; /* Change hover background color */
    color: #ecf0f1; /* Change hover text color */
  }
`;

const Navbar1 = () => {

  const history = useHistory();
  const dropdownRef = useRef(null);

  // const closeDropdowns = () => {
  //   setShowDropdown(false);
  //   setShowAdminDropdown(false);
  // };


  const MyJobPosts = () => {
    history.push("/my-job-posts");
  };

  const validateToken = async () => {
    const token = localStorage.getItem("tokenUser");

    if (!token) {
      alert("Token not found...You have not logged in...Please log in first");
      history.push("/alumni-login");
    }

    try {
      const requestBody = { token };
      const response = await axios.post(
        "http://localhost:8181/public/tokenValidation",
        requestBody
      );

      if (response.status === 200) {
        history.push("/Job-Arena");
      } else {
        alert("Token is invalid...Please log in again.");
        history.push("/alumni-login");
      }
    } catch (error) {
      console.error("Error validating token:", error);
      alert("An error occurred while validating the token. Please try again.");
      history.push("/alumni-login");
    }
  };


  const deleteAccount = async () => {
    try {
      const token = localStorage.getItem("tokenUser");

      if (!token) {
        alert("Token not found...You have not logged in...Please log in first");
        history.push("/alumni-login");
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

  const userLogOut = async () => {
    try {
      const token = localStorage.getItem("tokenUser");

      if (!token) {
        alert("Token not found...You have not logged in...Please log in first");
        history.push("/alumni-login");
        return;
      }

      const requestBody = { token };

      const response = await axios.post(
        "http://localhost:8181/UserLogout",
        requestBody
      );

      if (response.status === 200) {
        alert("Successfully logout");
        localStorage.removeItem("tokenUser");
        history.push("/alumni-login");
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



  const HandleProfileClick = () =>{
    setShowDropdown(!showDropdown);
    //validateForProfile();

  };

  const HandleAdminClick = () =>{
    setShowAdminDropdown(!showAdminDropdown);
    //validateAdmin();
  };


  const [showDropdown, setShowDropdown] = useState(false);

  const [showAdminDropdown, setShowAdminDropdown] = useState(false);

  const adminVerification = async () =>{
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Token not found...Please log in first");
        history.push("/admin-login");
      }

      const requestBody = { token };

      const response = await axios.post(
        "http://localhost:8181/public/tokenValidation",
        requestBody
      );

      if (response.status === 200) {
        history.push("/PendingRequestsPage");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        //console.error("Unauthorized access. Please log in again.");
        alert("Token is invalid. Please log in again.");
        history.push("/admin-login");
      } else {
        console.error("Error fetching pending requests:", error);
      }
    }
  }

  const adminLogOut = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Token not found...Please log in first");
        history.push("/admin-login");
      }

      const requestBody = { token };

      const response = await axios.post(
        "http://localhost:8181/adminLogout",
        requestBody
      );

      if (response.status === 200) {
        alert("Successfully logout as admin");
        localStorage.removeItem("token");
        history.push("/admin-login");
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


//  const OutsideAlerter = ({ children, onClickOutside }) => {
//     const wrapperRef = useRef(null);
  
//     useEffect(() => {
//       function handleClickOutside(event) {
//         if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//           onClickOutside();
//         }
//       }
  
//       document.addEventListener("mousedown", handleClickOutside);
//       return () => {
//         document.removeEventListener("mousedown", handleClickOutside);
//       };
//     }, [onClickOutside]);
  
//     return <div ref={wrapperRef}>{children}</div>;
//   };

 

  return (


    <NavbarContainer>
      <Logo>
        <img src="https://www.cuet.ac.bd/frontend/images/cuetlogo.png" alt="Logo" />
      </Logo>
      <LogoText>CUET CSE</LogoText>
      <NavLinks>
        <NavLinkItem>
          <NavLink to="/">Home</NavLink>
        </NavLinkItem>
        <NavLinkItem>
          <NavLink to="/Register">Register</NavLink>
        </NavLinkItem>
        <NavLinkItem>
          <NavLink to="/Job-Arena" onClick={validateToken}>
            JobSection
          </NavLink>
        </NavLinkItem>
        <NavLinkItem>
          <NavLink as="div" onClick={HandleProfileClick}>
            Profile
          </NavLink>
          {/* <OutsideAlerter onClickOutside={closeDropdowns} dropdownRef={dropdownRef}> */}
            <DropdownMenu show={showDropdown} profile={true} >
              <DropdownItem onClick={() => history.push("/User-Profile")}>See Profile</DropdownItem>
              <DropdownItem onClick={MyJobPosts}>My Posts</DropdownItem>
              <DropdownItem onClick={userLogOut}>Logout</DropdownItem>
              <DropdownItem onClick={() => history.push("/edit-profile")}>Edit Profile</DropdownItem>
              <DropdownItem
                onClick={() => {
                  const confirmDelete = window.confirm("Are you sure you want to delete your account?");
                  if (confirmDelete) {
                    deleteAccount();
                  }
                }}
              >
                Delete Account
              </DropdownItem>
            </DropdownMenu>
          {/* </OutsideAlerter> */}
        </NavLinkItem>
        <NavLinkItem>
          <NavLink as="div" onClick={HandleAdminClick}>
            Admin
          </NavLink>
          {/* <OutsideAlerter onClickOutside={closeDropdowns} dropdownRef={dropdownRef}> */}
            <DropdownMenu show={showAdminDropdown} >
              <DropdownItem onClick={adminVerification}>Dashboard</DropdownItem>
              <DropdownItem onClick={adminLogOut}>Logout</DropdownItem>
            </DropdownMenu>
          {/* </OutsideAlerter> */}
        </NavLinkItem>
        <NavLinkItem>
          <NavLink to="/">About</NavLink>
        </NavLinkItem>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar1;
