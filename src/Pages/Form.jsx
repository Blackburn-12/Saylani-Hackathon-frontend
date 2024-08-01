import React from "react";
import logo from "../Images/logo.22bf709605809177256c.png";
import facebook from "../Images/facebook.0d22b4d986cc357e30b7.png";
import instagram from "../Images/instagram.1506b398fa46f19bb324.png";
import youtube from "../Images/youtube.25bcb63515915fad0160.png";
import background from "../Images/photo-1541462608143-67571c6738dd.avif";
import { Link, useNavigate } from "react-router-dom";
import { PiStudentFill } from "react-icons/pi";
import "./Form.css";
import Registration from "../Components/Registration";

const Form = () => {
  const navigate = useNavigate();
  return (
    <div className="mainContainer">
      <div className="topContainer">
        <h3>Saylani Vocational & Technical Training</h3>
        <h6>
          Saylani Vocational & Technical Training Courses are now open, hurry up
          apply for brighter future!
        </h6>
      </div>
      <div className="registrationContainer">
        <div className="backgroundImg">
          <img src={background} alt="" />
        </div>
        <div className="saylaniLogo">
          <img src={logo} alt="Saylani Logo" />
        </div>
        <div className="secondLine">
          <div className="socials">
            <Link to="https://www.facebook.com/saylani.smit">
              {" "}
              <img src={facebook} alt="Facebook" />
            </Link>
            <Link to="https://www.instagram.com/saylanimassittraining">
              <img src={instagram} alt="Instagram" />
            </Link>
            <Link to="https://www.youtube.com/@SaylaniMassITTraining">
              <img src={youtube} alt="Youtube" />
            </Link>
          </div>
          <div className="registrationHead">
            <h1>Registration Form - SMIT</h1>
          </div>
          <div className="portal">
            <button onClick={() => navigate("/login")}>
              <PiStudentFill />
              Student Portal
            </button>
          </div>
        </div>
        <div className="services">
          <h5>Services - Education - Registration</h5>
        </div>
      </div>
      <div className="formContainer">
        <Registration />
      </div>
    </div>
  );
};

export default Form;
