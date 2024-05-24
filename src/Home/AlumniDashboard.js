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


//   return (

//     // <div className="dark:bg-gray-800">

//     //   <ul role="list" className="dark:divide-gray-700 divide-y divide-gray-100">
//     //     {people.map((person) => (
//     //       <li
//     //         key={person.email}
//     //         className="flex justify-between gap-x-6 py-5 dark:text-white"
//     //       >
//     //         <div className="flex min-w-0 gap-x-4">
//     //           <img
//     //             className="w-10 h-10 rounded-full"
//     //             src={`data:image/jpeg;base64,${person.profilePic}`}
//     //             alt="Jese image"
//     //           />
//     //           <div className="min-w-0 flex-auto">
//     //             <p className="text-sm font-semibold leading-6 text-gray-900">
//     //               {person.name}
//     //             </p>
//     //             <p className="mt-1 truncate text-xs leading-5 text-gray-500">
//     //               {person.email}
//     //             </p>
//     //           </div>
//     //         </div>

//     //       </li>
//     //     ))}
//     //   </ul>
//     // </div>
//   );
// };

// export default Example;
