import React from "react";
import "./Classes.css";
import InstructorImage from "../Images/College Student.png";

const Classes = ({ classTiming }) => {
  // Split the classTiming into parts
  const [courseName, classDays, classCampus] = classTiming.split(" - ");

  return (
    <div className="courseMain">
      <h2>Enrolled Course</h2>
      <div className="courseContainer">
        <div className="header"></div>
        <div>
          <div className="courseCard">
            <div className="courseDetails">
              <h3>{courseName}</h3>
              <button>View</button>
            </div>
            <div className="Instructor">
              <img src={InstructorImage} alt="Instructor" />
              <p>{classCampus}</p>
              <p>{classDays}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Classes;
