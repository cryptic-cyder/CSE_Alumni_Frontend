import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  background-color: #343a40;
  padding: 1rem;
`;

const NavbarBrand = styled.a`
  color: #fff;
  font-size: 1.5rem;
  text-decoration: none;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarBrand href="/"><center>CSE Alumni</center></NavbarBrand>
    </NavbarContainer>
  );
};

export default Navbar;
