// const response = await fetch(
//   `http://localhost:8181/public/adminLogin?email=${formData.email}&password=${formData.password}`,
//   {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//   }
// );

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//import "./MyLogin.css";
import axios from "axios";

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
        `http://localhost:8181/public/adminLogin?email=${formData.email}&password=${formData.password}`,
        FormData
      );

      //const { data } = response;
      console.log(response.data.token);

      
      if (response.status === 200) {
        // const contentType = response.headers.get("content-type");
        // if (contentType && contentType.includes("application/json")) {
        //   const responseBody = await response.text(); // Get response body as text
        //   console.log("Response body:", responseBody);
        //   if (responseBody === "User login successful") {
        //     console.log("Login successful");
        console.log("Login Successful");
        localStorage.setItem("token", response.data.token);
        history.push("/PendingRequestsPage"); // Redirect to job post page
        //}
        // else {
        //   console.error("Login failed");
        //   alert("Login failed. Please check your credentials.");
        // }
      } else {
        console.error("Invalid content type");
        alert("Invalid content type received. Please try again later.");
      }
    } catch (error) {
     
      alert("Your email or password is incorrect...");
    }
  };

  return (
    <main>






<center>
<div className="row mt-4">
                      <div className="col-md-6">
                        <div className="card">
                          <div className="card-body">
                            <h6
                              style={{
                                fontWeight: "bold",
                                marginTop: "10px",
                                marginBottom: "20px",
                                textAlign: "center",
                                fontSize: "20px",
                              }}
                            >
                              Admin Login
                            </h6>
                            <form
                              className="row g-3 form-prevent"
                              onSubmit={handleSubmit} // Add onSubmit handler
                            >
                              <input
                                type="hidden"
                                name="_token"
                                value="F5pwaZ8hSNWvzWto3DXEeUrUk3qTaZBEUq9jzyhC"
                              />

                              <div className="col-12">
                                <div className="form-floating">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter userEmail"
                                    required
                                  />
                                  <label htmlFor="userName">
                                    {" "}
                                    Admin userEmail
                                  </label>
                                </div>
                              </div>

                              <div className="col-12">
                                <div className="form-floating">
                                  <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter Password"
                                    required
                                  />
                                  <label htmlFor="password">Password</label>
                                </div>
                              </div>
                              <div className="col-12">
                                <button
                                  className="btn btn-primary w-100 form-prevent-multiple-submit"
                                  type="submit"
                                  style={{
                                    background: "#1D45B5",
                                    border: "1px solid #1D45B5",
                                  }}
                                >
                                  LOGIN
                                </button>
                              </div>
                              </form>

</div>
</div>

</div>
</div>

</center>













      {/* <div className="container">
        <section className="d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 d-flex flex-column align-items-center justify-content-center">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="mt-4 mb-4">
                      <div className="d-flex justify-content-center mb-2">
                        <img
                          src="https://erp.uttarauniversity.edu.bd/temp/assets/img/uu_brand_logo.png"
                          style={{ height: "80px" }}
                          alt="logo"
                        />
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <div className="card">
                          <div className="card-body">
                            <h6
                              style={{
                                fontWeight: "bold",
                                marginTop: "10px",
                                marginBottom: "20px",
                                textAlign: "center",
                                fontSize: "20px",
                              }}
                            >
                              Admin Login
                            </h6>
                            <form
                              className="row g-3 form-prevent"
                              onSubmit={handleSubmit} // Add onSubmit handler
                            >
                              <input
                                type="hidden"
                                name="_token"
                                value="F5pwaZ8hSNWvzWto3DXEeUrUk3qTaZBEUq9jzyhC"
                              />

                              <div className="col-12">
                                <div className="form-floating">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter userEmail"
                                    required
                                  />
                                  <label htmlFor="userName">
                                    {" "}
                                    Admin userEmail
                                  </label>
                                </div>
                              </div>

                              <div className="col-12">
                                <div className="form-floating">
                                  <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter Password"
                                    required
                                  />
                                  <label htmlFor="password">Password</label>
                                </div>
                              </div>
                              <div className="col-12">
                                <button
                                  className="btn btn-primary w-100 form-prevent-multiple-submit"
                                  type="submit"
                                  style={{
                                    background: "#1D45B5",
                                    border: "1px solid #1D45B5",
                                  }}
                                >
                                  LOGIN
                                </button>
                              </div>
                              <div className="col-12">
                                <p className="small mb-0">
                                  <i className="bi bi-lock-fill"></i> Forgot
                                  your password?{" "}
                                  <a
                                    href="https://erp.uttarauniversity.edu.bd/alumni-forget-password"
                                    className="font-weight-bold"
                                  >
                                    Click here
                                  </a>
                                </p>
                                <p className="small mb-0">
                                  <i className="bi bi-people-fill"></i> Not
                                  registered yet as alumni?{" "}
                                  <a href="/Alumni-registration">
                                    <span className="font-weight-bold base-color">
                                      Register Here
                                    </span>
                                  </a>
                                </p>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <h6
                          style={{
                            fontWeight: "bold",
                            marginTop: "10px",
                            textAlign: "center",
                            fontSize: "20px",
                            marginBottom: "0",
                          }}
                        >
                          Alumni Database Management
                        </h6>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            textAlign: "center",
                            margin: "0",
                          }}
                        >
                          Office of Alumni Affairs - Uttara University
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            fontWeight: "bold",
                            margin: "0",
                          }}
                        >
                          Instructions:
                        </p>
                        <p style={{ fontSize: "13px", margin: "0" }}>
                          If you are a Uttara University alumnus/alumna and
                          don't have your login details, then please complete
                          the{" "}
                          <a
                            href="https://erp.uttarauniversity.edu.bd/alumni-registration"
                            className="font-weight-bold"
                          >
                            registration
                          </a>{" "}
                          process. After that, we will verify your details and
                          send you the login details.
                        </p>
                        <p style={{ fontSize: "13px", margin: "0" }}>
                          If you already have your login details, then login
                          into your account and access your profile information.
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            fontWeight: "bold",
                            margin: "0",
                          }}
                        >
                          Contact:
                        </p>
                        <p style={{ fontSize: "13px", margin: "0" }}>
                          For any further query please contact us at:
                        </p>
                        <ul>
                          <li style={{ fontSize: "13px", margin: "0" }}>
                            Alumni Affairs Division, Uttara University
                          </li>
                          <li style={{ fontSize: "13px", margin: "0" }}>
                            Phone: +8801872607359
                          </li>
                          <li style={{ fontSize: "13px", margin: "0" }}>
                            Email: alumni@uttarauniversity.edu.bd
                          </li>
                          <li style={{ fontSize: "13px", margin: "0" }}>
                            Office Address: 2<sup>nd</sup> Floor, Uttara
                            University
                          </li>
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
