import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar1 from '../components/Navbar1';
import Footer from '../components/Footer';

const dummyPic = 'https://th.bing.com/th/id/OIP.rmim2jYzNpSCslo60INohQHaF9?rs=1&pid=ImgDetMain';

const PendingRequestsPage = () => {
  const location = useLocation();
  const { person } = location.state || {};

  if (!person) {
    return <div>No data available</div>;
  }

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <Navbar1 />
      <div className="mt-8 flex justify-center items-center flex-col md:flex-row">
        <img
          className="w-36 h-36 md:w-72 md:h-72 rounded-full object-cover mr-6"
          src={
            person.profilePic
              ? `data:image/jpeg;base64,${person.profilePic}`
              : dummyPic
          }
          alt="Profile Image"
        />
      </div>

      <div>
        <center>
          <p className="text-lg text-gray-600">{person.name}</p>
        </center>
      </div>

      <div>
        <center>
          <p className="text-lg text-gray-600">{person.email}</p>
        </center>
      </div>

      <div>
        <center>
          <p className="text-lg text-gray-600">{person.profDetails}</p>
        </center>
      </div>

      <div>
        <center>
          <p className="text-lg text-gray-600">{person.studentId}</p>
        </center>
      </div>
      <Footer/>
    </main>
  );
};

export default PendingRequestsPage;
