import React from "react";
import "./NoClasses.css";

const NoClasses = () => {
  return (
    <div className="cardContainerClasses">
      <h2 className="noClassesHead">Enrolled Classes</h2>
      <div className="card no-classes-card">
        <h2>No Classes</h2>
        <p>You have not been allotted any classes yet. Please check back later!</p>
      </div>
    </div>
  );
};

export default NoClasses;
