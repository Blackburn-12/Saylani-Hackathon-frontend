import React from "react";
import "./Card.css";

const FailCard = () => {
  return (
    <div className="cardContainer">
      <h2 className="resultHead">Admission Test Result</h2>
      <div className="card fail-card">
        <h2>Fail</h2>
        <p>Unfortunately, you have failed. Try again!</p>
      </div>
    </div>
  );
};

export default FailCard;
