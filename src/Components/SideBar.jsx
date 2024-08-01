import React from "react";
import { MdCreditScore, MdDashboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "./SideBar.css";
import { FaBars } from "react-icons/fa";
import { PiNotebookBold, PiSignOutBold } from "react-icons/pi";
import { FaClipboardQuestion } from "react-icons/fa6";
import { FiAlertCircle } from "react-icons/fi";
import { GrCertificate } from "react-icons/gr";

const SideBar = ({ isOpen, toggleSidebar, setPageType, pageType }) => {
  const navigate = useNavigate();

  const signoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSetPageType = (type) => {
    setPageType(type);
    if (window.innerWidth < 769) {
      toggleSidebar();
    }
  };

  return (
    <div className={`sideContainer ${isOpen ? "open" : ""}`}>
      <div className="dashboardHead">
        <h1>Dashboard</h1>
        <div className="toggleBtn" onClick={toggleSidebar}>
          <FaBars />
        </div>
      </div>
      <input className="searchBar" type="search" />
      <h4>PROFILE</h4>
      <div className="profileSignoutContainer">
        <div className="profileSection">
          <Link onClick={() => handleSetPageType("Dashboard")}>
            <div
              className={`listItems ${
                pageType === "Dashboard" ? "isActiveSide" : ""
              }`}
            >
              <MdDashboard />
              <h3>Dashboard</h3>
            </div>
          </Link>
          <Link onClick={() => handleSetPageType("Profile")}>
            <div
              className={`listItems ${
                pageType === "Profile" ? "isActiveSide" : ""
              }`}
            >
              <MdDashboard />
              <h3>Profile</h3>
            </div>
          </Link>
          <Link onClick={() => handleSetPageType("Fees")}>
            <div
              className={`listItems ${
                pageType === "Fees" ? "isActiveSide" : ""
              }`}
            >
              <MdCreditScore />
              <h3>Fees Payment</h3>
            </div>
          </Link>
          <Link onClick={() => handleSetPageType("Courses")}>
            <div
              className={`listItems ${
                pageType === "Courses" ? "isActiveSide" : ""
              }`}
            >
              <PiNotebookBold />
              <h3>Courses</h3>
            </div>
          </Link>
          <Link onClick={() => handleSetPageType("Results")}>
            <div
              className={`listItems ${
                pageType === "Results" ? "isActiveSide" : ""
              }`}
            >
              <FaClipboardQuestion />
              <h3>Results</h3>
            </div>
          </Link>
          <Link onClick={() => handleSetPageType("Notice")}>
            <div
              className={`listItems ${
                pageType === "Notice" ? "isActiveSide" : ""
              }`}
            >
              <FiAlertCircle />
              <h3>Notice</h3>
            </div>
          </Link>
          <Link onClick={() => handleSetPageType("Certificate")}>
            <div
              className={`listItems ${
                pageType === "Certificate" ? "isActiveSide" : ""
              }`}
            >
              <GrCertificate />
              <h3>Certificate</h3>
            </div>
          </Link>
        </div>
        <div className="signoutSection">
          <div className="listItems" onClick={signoutHandler}>
            <PiSignOutBold />
            <h3>Sign out</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
