import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AlumniCard from './AlumniCard';

const ListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  list-style-type: none;
  margin: 0;
  background-color: #121212; /* Dark background for the list container */
`;

const AlumniList = () => {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await axios.get('http://localhost:8181/public/fetch/allRegisteredAcc'); // Replace with your backend endpoint
        setAlumni(response.data);
      } catch (error) {
        console.error('Error fetching alumni data:', error);
      }
    };

    
   
    fetchAlumni();
  }, []);

  return (
    <ListContainer>
    {alumni
      .filter((alumnus) => alumnus.graduationYear) // Filter to include only those with a graduation year
      .map((alumnus) => (
        <AlumniCard key={alumnus.email} alumni={alumnus} />
      ))}
  </ListContainer>
  );
};

export default AlumniList;
