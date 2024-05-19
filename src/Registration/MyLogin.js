// const response = await axios.post(
//   `http://localhost:8181/public/UserLogin?&email=${formData.userName}&password=${formData.password}`,
//   FormData
// );

//const { data } = response;
//console.log(response.data.token);

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./MyLogin.css";
import axios from "axios";

// import "bootstrap/dist/css/bootstrap.min.css";

function LoginForm() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const history = useHistory(); // Access the history object

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8181/public/UserLogin?userEmail=${formData.email}&userPassword=${formData.password}`
      );

      //const { data } = response;
      console.log(response.data.token);

      if (response.status === 200) {
        //alert("User Login Successful");
        localStorage.setItem("tokenUser", response.data.token);
        // Redirect to job post page
         history.push("/Job-Arena");
      } 
      
    } catch (error) {

      if (error.response.status === 404) {
        alert(
          "Your account is not approved...After approval you can login..."
        );
      } 
      else if( error.response.status === 401) {
        alert("Password is incorrect. Please try again.");
      } 
      else if (error.response.status === 403) {
        alert("Sorry!!! There is no account with this email...");
      } 
      else if (error.response.status === 400) {
        alert("Something went wrong. Please try again later.");
      }
       else {
        alert("Invalid status...");
      }

      // console.error("Error:", error);
      // alert(error);
    }
  };

  return (
    <main>







<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-100 rounded-lg shadow-md">
                    <div className="p-4">
                      <h6 className="font-bold text-center text-lg mb-4">Alumni Login</h6>
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <input type="hidden" name="_token" value="F5pwaZ8hSNWvzWto3DXEeUrUk3qTaZBEUq9jzyhC" />
                        <div>
                          <label htmlFor="adminEmail" class="block">Alumni Email</label>
                          <input type="text" id="adminEmail" name="email" value={formData.email} onChange={handleChange} className="form-input w-full" placeholder="Enter Email" required />
                        </div>
                        <div>
                          <label htmlFor="adminPassword" class="block">Password</label>
                          <input type="password" 
                            id="adminPassword" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange}
                            className="form-input w-full"
                            placeholder="Enter Password" required />
                        </div>
                        <div>
                          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">LOGIN</button>
                        </div>
                        <div className="text-center">
                          <p className="text-sm mb-1"><i className="bi bi-lock-fill"></i> Forgot your password? <a href="https://erp.uttarauniversity.edu.bd/alumni-forget-password" className="font-bold">Click here</a></p>
                          <p className="text-sm mb-1"><i className="bi bi-people-fill"></i> Not registered yet as alumni? <a href="/Alumni-registration" className="font-bold text-blue-500">Register Here</a></p>
                        </div>
                      </form>
                    </div>
                  </div>
                  </div>















  {/* <div className="container mx-auto">
    <section className="flex flex-col items-center justify-center py-4">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full md:w-8/12">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4">
                <div className="mt-4 mb-4">
                  <div className="flex justify-center mb-2">
                    <img src="" className="h-20" alt="logo" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-100 rounded-lg shadow-md">
                    <div className="p-4">
                      <h6 className="font-bold text-center text-lg mb-4">Alumni Login</h6>
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <input type="hidden" name="_token" value="F5pwaZ8hSNWvzWto3DXEeUrUk3qTaZBEUq9jzyhC" />
                        <div>
                          <label htmlFor="adminEmail" className="block">Alumni Email</label>
                          <input type="text" id="adminEmail" name="adminEmail" value={formData.adminEmail} onChange={handleChange} className="form-input w-full" placeholder="Enter Email" required />
                        </div>
                        <div>
                          <label htmlFor="adminPassword" className="block">Password</label>
                          <input type="password" id="adminPassword" name="adminPassword" value={formData.adminPassword} onChange={handleChange} className="form-input w-full" placeholder="Enter Password" required />
                        </div>
                        <div>
                          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">LOGIN</button>
                        </div>
                        <div className="text-center">
                          <p className="text-sm mb-1"><i className="bi bi-lock-fill"></i> Forgot your password? <a href="https://erp.uttarauniversity.edu.bd/alumni-forget-password" className="font-bold">Click here</a></p>
                          <p className="text-sm mb-1"><i className="bi bi-people-fill"></i> Not registered yet as alumni? <a href="/Alumni-registration" className="font-bold text-blue-500">Register Here</a></p>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="p-4">
                    <h6 className="font-bold text-center text-lg mb-4">Alumni Database Management</h6>
                    <p className="text-center font-bold">Office of Alumni Affairs - Uttara University</p>
                    <p className="text-sm font-bold mt-2">Instructions:</p>
                    <p className="text-sm">
                      If you are a Uttara University alumnus/alumna and don't have your login details, then please complete the <a href="https://erp.uttarauniversity.edu.bd/alumni-registration" className="font-bold text-blue-500">registration</a> process. After that, we will verify your details and send you the login details.
                    </p>
                    <p className="text-sm">
                      If you already have your login details, then login into your account and access your profile information.
                    </p>
                    <p className="text-sm font-bold mt-2">Contact:</p>
                    <p className="text-sm">
                      For any further query please contact us at:
                    </p>
                    <ul className="list-disc list-inside">
                      <li>Alumni Affairs Division, Uttara University</li>
                      <li>Phone: +8801872607359</li>
                      <li>Email: alumni@uttarauniversity.edu.bd</li>
                      <li>Office Address: 2<sup className="text-xs">nd</sup> Floor, Uttara University</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div> */}
</main>

  );
}

export default LoginForm;
