import React from 'react';
import './Card.css';

const PendingCard = () => {
  return (
    <div className='cardContainer'>
      <h2 className="resultHead">Admission Test Result</h2>
    <div className="card pending-card">
      <h2>Pending</h2>
      <p>Your result has not been announced yet. Hold tight!</p>
    </div>
    </div>
  );
};

export default PendingCard;
