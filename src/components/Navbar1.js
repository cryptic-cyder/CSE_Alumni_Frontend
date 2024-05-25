// src/components/Navbar1.js

import React from 'react';
import styled from 'styled-components';
import { Link,useHistory } from 'react-router-dom'; // Import Link for routing
import axios from "axios";

const NavbarContainer = styled.nav`
  background-color: #320;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;
`;

const NavLinkItem = styled.li`
  margin-left: 1rem;
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
      } 
      else {
        alert("Token is invalid...Please log in again.");
        history.push("/admin-login");
      }
    }
    catch (error) {
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
      } 
      else {
        alert("Token is invalid...Please log in again.");
        history.push("/alumni-login");
      }
    }
    catch (error) {
      console.error("Error validating token:", error);
      alert("An error occurred while validating the token. Please try again.");
      history.push("/alumni-login");
    }
  };





  return (
    <NavbarContainer>
      <Logo></Logo>
      <NavLinks>
        <NavLinkItem>
          <NavLink to="/">Home</NavLink>
        </NavLinkItem>
        <NavLinkItem>
          <NavLink to="/Register">Register</NavLink>
        </NavLinkItem>
        <NavLinkItem>
          <NavLink to="/Job-Arena" onClick={validateToken}>JobSection</NavLink>
        </NavLinkItem>
        <NavLinkItem>
          <NavLink to="/Job-Arena" onClick={validateForProfile}>Profile</NavLink>
        </NavLinkItem>
        <NavLinkItem>
          <NavLink to="/admin-login" onClick={validateAdmin}>Admin</NavLink>
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
