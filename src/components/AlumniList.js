import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import AlumniCard from "./AlumniCard";

const ListContainer = styled.div`
  padding: 2rem;
  background-color: #121212; /* Dark background for the list container */
  color: white; /* Ensure text is readable on dark background */
`;

const AlumniGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;



const HeroText = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.0rem; /* Increase font size for the heading */
  font-weight: bold;
   color: #00e5ff;
 
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.7), 0 0 20px rgba(255, 215, 0, 0.7);
  animation: pulsate 2.5s infinite;

  @keyframes pulsate {
    0% {
      text-shadow: 0 0 5px rgba(255, 215, 0, 0.5), 0 0 10px rgba(255, 215, 0, 0.5);
    }
    50% {
      text-shadow: 0 0 20px rgba(255, 215, 0, 1), 0 0 30px rgba(255, 215, 0, 1);
    }
    100% {
      text-shadow: 0 0 5px rgba(255, 215, 0, 0.5), 0 0 10px rgba(255, 215, 0, 0.5);
    }
  }
`;

const SeeMoreContainer = styled.div`
  display: flex;
  justify-content: center; /* Center the "See more" link horizontally */
  margin-top: 20px;
`;

const HeroLink = styled.a`
  text-decoration: none;
  font-size: 1.2rem; /* Increase font size for the link */
  font-weight: bold;
  color: #007bff;
  text-shadow: 0 0 10px rgba(0, 123, 255, 0.7), 0 0 20px rgba(0, 123, 255, 0.7);
 

  &:hover {
    text-decoration: underline;
  }

  &::after {
    content: ' →';
  }

  @keyframes pulsate {
    0% {
      text-shadow: 0 0 5px rgba(0, 123, 255, 0.5), 0 0 10px rgba(0, 123, 255, 0.5);
    }
    50% {
      text-shadow: 0 0 20px rgba(0, 123, 255, 1), 0 0 30px rgba(0, 123, 255, 1);
    }
    100% {
      text-shadow: 0 0 5px rgba(0, 123, 255, 0.5), 0 0 10px rgba(0, 123, 255, 0.5);
    }
  }
`;








const AlumniList = () => {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8181/public/fetch/allRegisteredAcc"
        );
        setAlumni(response.data);
      } catch (error) {
        console.error("Error fetching alumni data:", error);
      }
    };

    fetchAlumni();
  }, []);

  return (
    <ListContainer>
       <HeroText>Notable Alumnus</HeroText>
      <AlumniGrid>
        {alumni
          .filter((alumnus) => alumnus.graduationYear) // Filter to include only those with a graduation year
          .map((alumnus) => (
            <AlumniCard key={alumnus.email} alumni={alumnus} />
          ))}
      </AlumniGrid>
      <SeeMoreContainer>
        <HeroLink href="/AllMembers">See more</HeroLink>
      </SeeMoreContainer>
    </ListContainer>
  );
};

export default AlumniList;
