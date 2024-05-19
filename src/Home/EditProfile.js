import React, { useState, useEffect } from "react";
import "./ProfileEdit.css";
import axios from "axios";

// import "bootstrap/dist/css/bootstrap.min.css";
import userEvent from "@testing-library/user-event";

function LoginForm() {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    passwordOfUser: "",
    profilePicOfUser: null,
    identityPic: null,
    studentId: "",
    YearOfGraduation: "",
  });

  const [isGraduated, setIsGraduated] = useState(false);

  const handleGraduationStatusChange = (e) => {
    const { value } = e.target;
    setIsGraduated(value === "Graduated");
    setFormData((prevFormData) => ({
      ...prevFormData,
      graduationStatus: value,
      graduationYear: "", // Reset graduation year when status changes
    }));
  };




  
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };



  const requestData = {
    userName: formData.userName,
    userEmail: formData.userEmail,
    passwordOfUser: formData.passwordOfUser,
    profilePicOfUser: formData.profilePicOfUser,
    identityPic: formData.identityPic,
    studentId: formData.studentId,
    YearOfGraduation: formData.YearOfGraduation,
};




  const handleSubmit = async (e) => {
    e.preventDefault();

    

    try {
      const token = localStorage.getItem("tokenUser");

      if (!token) {
        console.error("Token not found");
        return;
      }

      // const requestBody = { token };

      const formDataObj = new FormData();
      for (const key in formData) {
        if (formData[key] !== "") {
          formDataObj.append(key, formData[key]);
        }
      }




      const response = await axios.post(
        "http://localhost:8181/updateAcc",
        requestData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }
    );




    //   const response = await fetch("http://localhost:8181/updateAcc", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify(requestData),
    //   });





      if (response.status === 200) {
        alert("Your account is updated...");
        console.log(response.data); // Log response data
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main>
      <div className="container">
        <section className="d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="d-flex flex-column align-items-center justify-content-center">
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
                    <h4 className="font-weight-bold text-center text-uppercase mb-2">
                      Edit Profile
                    </h4>
                    <form
                      className="row mt-2 g-3 form-prevent"
                      method="POST"
                      encType="multipart/form-data"
                      onSubmit={handleSubmit}
                    >
                      <input
                        type="hidden"
                        name="_token"
                        value="PnHm4L2FHyuOIN2UXk55Ra0sLEKyOsPbNfFCUOXw"
                      />

                      <div className="row mt-3">
                        <div className="col-md-6">
                          <div className="form-group mb-2">
                            <label className="form-label">
                              Full Name
                              <span className="required-mask">*</span>
                            </label>
                            <input
                              type="text"
                              maxLength="255"
                              className="form-control uppercase"
                              name="userName"
                              value={formData.userName} // Bind value to state variable
                              onChange={handleChange} // Handle change event
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group mb-2">
                            <label className="form-label">
                              Email
                              <span className="required-mask">*</span>
                            </label>
                            <input
                              type="email"
                              maxLength="255"
                              className="form-control"
                              name="userEmail"
                              value={formData.userEmail}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group mb-2">
                            <label className="form-label">
                              Password
                              <span className="required-mask">*</span>
                            </label>
                            <input
                              type="password"
                              maxLength="255"
                              className="form-control"
                              name="passwordOfUser"
                              value={formData.passwordOfUser}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group mb-2">
                            <label className="form-label">
                              Profile Picture
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              name="profilePicOfUser"
                              onChange={handleChange}
                              accept="image/*" // This attribute restricts the file selection to images only
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group mb-2">
                          <label className="form-label">
                            Graduation Status{" "}
                            <span className="required-mask">*</span>
                          </label>
                          <select
                            className="form-select"
                            name="graduationStatus"
                            value={formData.graduationStatus}
                            onChange={handleGraduationStatusChange}
                          >
                            <option value="">-- Select --</option>
                            <option value="Graduated">Graduated</option>
                            <option value="Non-graduated">Non-graduated</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group mb-2">
                          <label className="form-label">
                            Identity <span className="required-mask">*</span>
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            name="identityPic"
                            onChange={handleChange}
                            accept="image/*"
                          />
                        </div>
                      </div>

                      {isGraduated && (
                        <>
                          <div className="col-md-6">
                            <div className="form-group mb-2">
                              <label className="form-label">
                                Graduation Year{" "}
                                <span className="required-mask">*</span>
                              </label>
                              <input
                                type="text"
                                maxLength="4" // Assuming maximum length of graduation year is 4
                                className="form-control uppercase"
                                name="YearOfGraduation"
                                value={formData.YearOfGraduation}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {!isGraduated && (
                        <>
                          <div className="col-md-6">
                            <div className="form-group mb-2">
                              <label className="form-label">
                                StudentId{" "}
                                <span className="required-mask">*</span>
                              </label>
                              <input
                                type="text"
                                maxLength="8" // Assuming maximum length of graduation year is 4
                                className="form-control uppercase"
                                name="studentId"
                                value={formData.studentId}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      <div className="col-md-12 text-center">
                        <button
                          className="btn btn-primary form-prevent-multiple-submit"
                          type="submit"
                        >
                          Update Now
                        </button>
                      </div>
                    </form>
                    <div className="row mt-3">
                      <div className="col-md-12 text-center">
                        <p>
                          Visit Uttara University{" "}
                          <a href="https://uttarauniversity.edu.bd/">
                            <span className="font-weight-bold base-color">
                              Official Website
                            </span>
                          </a>
                          <br />
                          For any alumni related queries please contact{" "}
                          <span className="font-weight-bold base-color">
                            alumni@uttarauniversity.edu.bd
                          </span>{" "}
                          or call at{" "}
                          <span className="font-weight-bold base-color">
                            01872-607359
                          </span>
                          <br />
                          Visit alumni official{" "}
                          <a
                            href="https://www.facebook.com/groups/uualumniassociation"
                            target="_blank"
                          >
                            <span className="font-weight-bold base-color">
                              Facebook page
                            </span>
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginForm;
