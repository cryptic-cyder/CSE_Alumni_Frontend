import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const Card = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #444444; /* Slightly lighter background */
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem; /* Reduced padding */
  margin: 0.5rem; /* Reduced margin */
  transition: transform 0.2s, box-shadow 0.2s;
  width: 220px;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;


const CardImage = styled.img`
  border-radius: 50%;
  width: 60px; /* Smaller profile image */
  height: 60px; /* Smaller profile image */
  margin-bottom: 0.5rem; /* Reduced margin */
  object-fit: cover;
`;

const CardName = styled.h3`
  font-size: 1rem; /* Reduced font size */
  font-weight: 700;
  color: #f0f0f0; /* Light color for contrast */
  margin-bottom: 0.25rem; /* Reduced margin */
`;

const CardEmail = styled.p`
  font-size: 0.75rem; /* Reduced font size */
  color: #ccc; /* Light color for contrast */
  margin-bottom: 0.25rem; /* Reduced margin */
  text-align: center;
`;

const ClickableDiv = styled.div`
  cursor: pointer;
`;

const dummyPic = 'https://th.bing.com/th/id/OIP.rmim2jYzNpSCslo60INohQHaF9?rs=1&pid=ImgDetMain';

const AlumniCard = ({ alumni }) => {

  const history = useHistory();

  const handleClick = async () => {

    try {
     
      const response = await axios.post(
        `http://localhost:8181/fetchOthers/${alumni.email}`
      
      );

      if (response.status === 200) {
        history.push({
          pathname: "/othersPerson",
          state: { person: response.data }
        });
      } 
      else if(response.status===401){
        alert("Token is invalid...Please log in again.");
        history.push("/alumni-login");
      }
    }
    catch (error) {
      console.error("Error validating token:", error);
      alert("An error occurred while validating the token. Please try again.");
      //history.push("/admin-login");
    }
  };



  return (
    <ClickableDiv onClick={handleClick}>
    <Card>
      <CardImage
        src={
          alumni.profilePic
            ? `data:image/jpeg;base64,${alumni.profilePic}`
            : dummyPic
        }
        alt={`${alumni.name}'s profile`}
      />
      <CardName>{alumni.name}</CardName>
      <CardEmail>{alumni.email}</CardEmail>
    </Card>
    </ClickableDiv>
  );
};

export default AlumniCard;
