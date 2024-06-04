// src/components/Footer.js

import React from "react";
import styled from "styled-components";
// import {
//   FaFacebookF,
//   FaTwitter,
//   FaInstagram,
//   FaLinkedinIn,
// } from "react-icons/fa";

const FooterContainer = styled.footer`
  background-color: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem;
  height: 155px;
  width: 100%;
`;

// const FooterLinks = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-bottom: 1rem;
// `;

// const FooterLink = styled.a`
//   color: white;
//   text-decoration: none;
//   margin: 0 1rem;
//   transition: color 0.3s ease;

//   &:hover {
//     color: lightgray;
//   }
// `;

// const SocialMediaIcons = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-bottom: 1rem;
// `;

// const SocialIcon = styled.a`
//   color: white;
//   font-size: 1.5rem;
//   margin: 0 0.5rem;
//   transition: color 0.3s ease;

//   &:hover {
//     color: lightgray;
//   }
// `;

const FooterText = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  text-align: center;
`;

const AddressText = styled.address`
  margin-top: 1rem;
  font-style: normal;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      {/* <SocialMediaIcons>
        <SocialIcon href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </SocialIcon>
        <SocialIcon href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </SocialIcon>
        <SocialIcon href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </SocialIcon>
        <SocialIcon href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn />
        </SocialIcon>
      </SocialMediaIcons> */}
      <FooterText style={{ fontSize: "18px" }}>
        &copy; {new Date().getFullYear()} Chittagong University of Engineering &
        Technology. All rights reserved.
      </FooterText>
      <AddressText>
        registrar@cuet.ac.bd
        <br />
        +880-31-714946
        <br />
        Pahartoli, Raozan-4349
        <br />
        Chittagong, Bangladesh
      </AddressText>
    </FooterContainer>
  );
};

export default Footer;
