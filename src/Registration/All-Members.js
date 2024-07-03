import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../components/ProfileCard";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";
import styled from "styled-components";
import "./All-Members.css";




const ProfileListContainer = styled.div`
  padding: 80px 2rem 2rem; /* Adjusted padding to accommodate navbar */
  background-color: #121212;
`;

const ProfilesGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const NavbarContainer = styled.nav`
  width: 100%;
  background-color: #333;
  color: white;
  text-align: center;
  position: fixed; /* Fixed at the top */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* Ensures the navbar is on top of other elements */
`;




const ProfileList = () => {

   
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [isSearching, setIsSearching] = useState(false);


  const [alumni, setAlumni] = useState([]);
  //const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = async () => {
    try {

        console.log(searchQuery);
      const response = await axios.post("http://localhost:8181/SearchMembers", {
        searchContent: searchQuery,
      });

      setFilteredPosts(response.data);
      setIsSearching(true);
    } catch (error) {
      console.error("Error searching posts:", error);
    }
  };
  

  return (
    <div>
    <ProfileListContainer>
        <NavbarContainer><Navbar1/></NavbarContainer>
        
        <div className="search-bar-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search People..."
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
          </div>
     
      <ProfilesGrid>

      {isSearching
            ? filteredPosts.map((alumnus) => <ProfileCard key={alumnus.email} alumni={alumnus} />)
            : alumni.map((alumnus) => <ProfileCard key={alumnus.email} alumni={alumnus} />)}

        {/* {alumni.map((alumnus) => (
          <ProfileCard key={alumnus.email} alumni={alumnus} />
        ))} */}
      </ProfilesGrid>
    
    </ProfileListContainer>  
<Footer/>
    </div>
    
  );
};

export default ProfileList;
