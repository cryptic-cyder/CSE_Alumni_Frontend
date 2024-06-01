import React from 'react';
import styled from 'styled-components';
import Navbar1 from '../components/Navbar1'; // Import the new Navbar1 component
import AlumniList from '../components/AlumniList';

const PageContainer = styled.div`
  font-family: Arial, sans-serif;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  text-align: center;
  padding: 4rem 1rem;
`;

const HeroText = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const HomePage = () => {
  return (
    <PageContainer>
      <Navbar1 /> {/* Include the new Navbar1 component */}
      <HeroSection>
        <HeroText>Welcome to CSE Alumni Network</HeroText>
        <p>Connecting alumni from around the world.</p>
      </HeroSection>
      <div className="p-6">
        <AlumniList />
      </div>
    </PageContainer>
  );
};

export default HomePage;

