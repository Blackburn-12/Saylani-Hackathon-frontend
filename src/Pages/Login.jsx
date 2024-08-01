import React, { useState } from "react";
import Logo from "../Images/logo-OpazD70S.png";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleloginClick = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formValues.email) errors.email = "Email is required";
    if (!formValues.password) errors.password = "Password is required";
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/login`,
          formValues
        );
        if (response.data.token) {
          // Save token to local storage or any other preferred method
          localStorage.setItem("token", response.data.token);
          console.log("Login Successful:", response.data.token);
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Login Error:", error.response.data);
        alert("Login failed. Please check your credentials and try again.");
      }
    } else {
      alert("Please fill in all the fields.");
    }
  };
  return (
    <div className="loginMain">
      <div className="loginContent">
        <div className="sideContainerLogin">
          {/* <div className="sideContainerText">
            <h3>
              "The beautiful thing about learning is that no one can take it
              away from you."
            </h3>
          </div> */}
        </div>
        <div className="contentContainer">
          <img src={Logo} alt="SMIT Logo" />
          <h2>Student Portal</h2>
          <div className="emailSec">
            <label htmlFor="">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleInputChange}
              style={{ borderColor: formErrors.email ? "red" : "" }}
            />
          </div>
          <div className="pwordSec">
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleInputChange}
              style={{ borderColor: formErrors.password ? "red" : "" }}
            />
          </div>
          <div className="buttonSec">
            <label htmlFor="">
              Not registered yet?{" "}
              <span onClick={() => navigate("/")}>Fill the form here!</span>
            </label>
            <button onClick={handleloginClick}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
