import React from "react";
import "./Card.css";

const PassCard = () => {
  return (
    <div className="cardContainer">
      <h2 className="resultHead">Admission Test Result</h2>
      <div className="card pass-card">
        <h2>Pass</h2>
        <p>Congratulations! You have passed.</p>
      </div>
    </div>
  );
};

export default PassCard;
