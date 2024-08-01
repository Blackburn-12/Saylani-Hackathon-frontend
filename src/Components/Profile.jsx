import React, { useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css";

const Profile = ({ user }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const email = user.email;
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/change-password`,
        { email, oldPassword, newPassword }
      );
      setMessage(response.data.message);
      toast.success("Password updated successfully!", {
        pauseOnHover: false,
        autoClose: 3000,
        style: {
          backgroundColor: "#E0F7FA",
        },
      });
      setIsModalOpen(false);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error changing password");
    }
  };

  const handleOpenModal = () => {
    setOldPassword("");
    setNewPassword("");
    setMessage("");
    setIsModalOpen(true);
  };

  const formattedDateOfBirth = new Date(user?.dateOfBirth).toLocaleDateString(
    "en-GB"
  );

  return (
    <>
      <div className="profileMain">
        <div className="profileImageContainer">
          <img
            className="profileImage"
            src={user?.profilePhotoUrl}
            alt="Profile"
          />
        </div>
        <div className="profileText">
          <div className="profileSect">
            <div className="fieldContainer">
              <span>Email:</span>
              <p>{user?.email}</p>
            </div>
            <div className="fieldContainer">
              <span>Password:</span>
              <p>********</p>
              <button
                className="editButton"
                onClick={handleOpenModal}
              >
                <FaEdit />
                Edit
              </button>
            </div>
            <div className="fieldContainer">
              <span>Name:</span>
              <p>{user?.name}</p>
            </div>
            <div className="fieldContainer">
              <span>Father's Name:</span>
              <p>{user?.fatherName}</p>
            </div>
            <div className="fieldContainer">
              <span>Roll Number:</span>
              <p>{user?.rollNumber}</p>
            </div>
            <div className="fieldContainer">
              <span>CNIC Number:</span>
              <p>{user?.cnicNumber}</p>
            </div>
            <div className="fieldContainer">
              <span>Phone Number:</span>
              <p>{user?.phoneNumber}</p>
            </div>
            <div className="fieldContainer">
              <span>Date of Birth:</span>
              <p>{formattedDateOfBirth}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          <div
            className="modal-overlay-profile"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="modal-content-profile">
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              <FaTimes />
            </button>
            <h2>Change Password</h2>
            <form onSubmit={handlePasswordChange}>
              <div className="fieldContainer">
                <label htmlFor="oldPassword">Old Password:</label>
                <input
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>
              <div className="fieldContainer">
                <label htmlFor="newPassword">New Password:</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <button className="passwordUpdateButton" type="submit">
                Update Password
              </button>
              {message && <p className="error">{message}</p>}
            </form>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default Profile;
