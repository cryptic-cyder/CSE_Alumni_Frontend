// src/components/Navbar1.js

import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom"; // Import Link for routing
import axios from "axios";

const NavbarContainer = styled.nav`
  background-color: #304b5b; /* Lighter deep ocean blue background */
  color: #c8dce6; /* Lighter cyan text color */
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
  margin-left: 17rem; /* Adjust spacing between logo and text */
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
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  transition: color 0.3s ease;

  &:hover {
    color: lightgray;
  }
`;

const Navbar1 = () => {
  const history = useHistory();

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

  const validateAdmin = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Token not found...You have not logged in...Please log in first");
      history.push("/admin-login");
    }

    try {
      const requestBody = { token };
      const response = await axios.post(
        "http://localhost:8181/public/tokenValidation",
        requestBody
      );

      if (response.status === 200) {
        history.push("/PendingRequestsPage");
      } else {
        alert("Token is invalid...Please log in again.");
        history.push("/admin-login");
      }
    } catch (error) {
      console.error("Error validating token:", error);
      alert("An error occurred while validating the token. Please try again.");
      history.push("/admin-login");
    }
  };

  const validateForProfile = async () => {
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
        history.push("/User-Profile");
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

  return (
    <NavbarContainer>

      
      <Logo>
        <img
          src="https://www.cuet.ac.bd/frontend/images/cuetlogo.png"
          alt="Logo"
          
        />


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
          <NavLink to="/Job-Arena" onClick={validateForProfile}>
            Profile
          </NavLink>
        </NavLinkItem>
        <NavLinkItem>
          <NavLink to="/admin-login" onClick={validateAdmin}>
            Admin
          </NavLink>
        </NavLinkItem>
        <NavLinkItem>
          <NavLink to="/">About</NavLink>
        </NavLinkItem>

        {/* Add more NavLinkItems for additional options */}
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar1;
