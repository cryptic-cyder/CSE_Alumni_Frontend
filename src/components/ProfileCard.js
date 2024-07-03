import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Card = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #444444;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin: 0.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  width: 220px;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-bottom: 0.5rem;
  object-fit: cover;
`;

const CardName = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #f0f0f0;
  margin-bottom: 0.25rem;
`;

const CardEmail = styled.p`
  font-size: 0.75rem;
  color: #ccc;
  margin-bottom: 0.25rem;
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
      } else if (response.status === 401) {
        alert("Token is invalid...Please log in again.");
        history.push("/alumni-login");
      }
    } catch (error) {
      console.error("Error validating token:", error);
      alert("An error occurred while validating the token. Please try again.");
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
