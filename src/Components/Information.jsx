import React from "react";
import "./Information.css";

const Information = ({ user }) => {
  const formattedDateOfBirth = new Date(user?.dateOfBirth).toLocaleDateString(
    "en-GB"
  );
  return (
    <>
      <div className={`infoContainer`}>
        <div className="textContainer">
          <h1>Welcome back, {user?.name}</h1>
          <p>Always stay updated in your student portal</p>

          <div className="profileDetails">
            <div className="profileDetailsDiv">
              <span>Full Name : </span>
              <label htmlFor="">{user?.name}</label>
            </div>
            <div className="profileDetailsDiv">
              <span>Roll Number : </span>
              <label htmlFor="">{user?.rollNumber}</label>
            </div>
            <div className="profileDetailsDiv">
              <span>Date of Birth : </span>
              <label htmlFor="">{formattedDateOfBirth}</label>
            </div>
            <div className="profileDetailsDiv">
              <span>Phone Number : </span>
              <label htmlFor="">{user?.phoneNumber}</label>
            </div>
            <div className="profileDetailsDiv">
              <span>CNIC : </span>
              <label htmlFor="">{user?.cnicNumber}</label>
            </div>
          </div>
        </div>
        <div className="imageContainerInfo">
          <img src={user?.profilePhotoUrl} alt="" />
        </div>
      </div>
    </>
  );
};

export default Information;
