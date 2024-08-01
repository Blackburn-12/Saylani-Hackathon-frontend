import React, { useState, useEffect } from "react";
import "./Personal.css";
import { useDispatch, useSelector } from "react-redux";
import { updateFormValues } from "../redux/extractedTextSlice";

const Personal = ({ setPage }) => {
  const dispatch = useDispatch();
  const extractedText = useSelector((state) => state.extractedText);

  const convertDateFormat = (dateString) => {
    const parts = dateString.split('.');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month}-${day}`;
    }
    return dateString; // Return original if format doesn't match
  };

  // Initialize formValues with extractedText values from Redux
  const [formValues, setFormValues] = useState({
    name: extractedText?.name || "",
    fatherName: extractedText?.fatherName || "",
    cnicNumber: extractedText?.cnicNumber || "",
    dateOfBirth: extractedText?.dateOfBirth ? convertDateFormat(extractedText.dateOfBirth) : "",
    gender: extractedText?.gender || "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    dispatch(updateFormValues({ [name]: value })); // Dispatch action to update Redux state
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    const errors = {};
    Object.keys(formValues).forEach((field) => {
      if (!formValues[field]) {
        errors[field] = true;
      }
    });
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setPage("Course");
    }
  };

  const handlePrevClick = () => {
    setPage("signup");
  };

  useEffect(() => {
    // Log extractedText for debugging purposes
    console.log("Extracted Text in Personal component:", extractedText);
  }, [extractedText]);

  console.log("Date of Birth:", formValues.dateOfBirth);

  return (
    <>
      <fieldset>
        <form action="">
          <div className="Rows">
            <div className="inputSeperation">
              <div className="inputField">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  style={{
                    borderColor: formErrors.name ? "red" : "",
                  }}
                />
              </div>
              <div className="inputField">
                <label htmlFor="fatherName">Father's Name</label>
                <input
                  type="text"
                  name="fatherName"
                  placeholder="Father's Name"
                  value={formValues.fatherName}
                  onChange={handleInputChange}
                  style={{
                    borderColor: formErrors.fatherName ? "red" : "",
                  }}
                />
              </div>
              <div className="inputField">
                <label htmlFor="cnicNumber">CNIC Number</label>
                <input
                  type="text"
                  name="cnicNumber"
                  placeholder="CNIC Number"
                  value={formValues.cnicNumber}
                  onChange={handleInputChange}
                  style={{
                    borderColor: formErrors.cnicNumber ? "red" : "",
                  }}
                />
              </div>
              <div className="inputField">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  placeholder="Date of Birth"
                  value={formValues.dateOfBirth}
                  onChange={handleInputChange}
                  style={{
                    borderColor: formErrors.dateOfBirth ? "red" : "",
                  }}
                />
              </div>
              <div className="inputField">
                <label htmlFor="gender">Gender</label>
                <select
                  name="gender"
                  value={formValues.gender}
                  onChange={handleInputChange}
                  style={{
                    borderColor: formErrors.gender ? "red" : "",
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div className="controlButtons">
            <div className="prevButtonContainer">
              <button className="prevBtn" onClick={handlePrevClick}>
                Back
              </button>
            </div>
            <div className="nextButtonContainer">
              <button className="nextBtn" onClick={handleNextClick}>
                Next
              </button>
            </div>
          </div>
        </form>
      </fieldset>
    </>
  );
};

export default Personal;
