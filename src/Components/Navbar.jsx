import React from "react";
import { FaBars } from "react-icons/fa";
import image from "../Images/Frame 19.png";
import logo from "../Images/logo-OpazD70S.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ user, isOpen, toggleSidebar, setPageType }) => {
  return (
    <>
      <div className={`navContainer`}>
        <div
          className={`toggleIcon ${isOpen ? "toggleIconToggled" : ""}`}
          onClick={toggleSidebar}
        >
          <FaBars />
        </div>
        <Link onClick={() => setPageType("Dashboard")}>
          <div className="imageContainerLogo">
            <img src={logo} alt="Logo" />
          </div>
        </Link>
        <Link onClick={() => setPageType("Profile")}>
          <div className="profileContainer">
            <img
              src={user.profilePhotoUrl ? user.profilePhotoUrl : image}
              alt="Profile"
            />
            <h4 className="nameNav">{user?.name}</h4>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
