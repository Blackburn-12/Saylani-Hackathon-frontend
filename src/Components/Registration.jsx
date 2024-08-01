import React, { useState } from "react";
import "./Registration.css";
import Signup from "./Signup";
import Personal from "./Personal";
import Course from "./Course";

const Registration = () => {
  const [page, setPage] = useState("signup");

  return (
    <div className="mainForm">
      <div className="buttonsContainer">
        <button className={page === "signup" ? "isActive" : ""}>Sign-up</button>
        <button className={page === "Personal" ? "isActive" : ""}>
          Personal Information
        </button>
        <button className={page === "Course" ? "isActive" : ""}>
          Course Information
        </button>
      </div>
      {page === "signup" && <Signup setPage={setPage} />}
      {page === "Personal" && <Personal setPage={setPage} />}
      {page === "Course" && <Course setPage={setPage} />}
    </div>
  );
};

export default Registration;
