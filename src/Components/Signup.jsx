import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setExtractedText,
  updateFormValues,
} from "../redux/extractedTextSlice";
import axios from "axios";
import "./Signup.css";

const Signup = ({ setPage }) => {
  const dispatch = useDispatch();
  const extractedText = useSelector((state) => state.extractedText);

  const [selectedFrontImage, setSelectedFrontImage] = useState(
    extractedText.frontImage || null
  );
  const [selectedProfileImage, setSelectedProfileImage] = useState(
    extractedText.profileImage || null
  );
  const [formErrors, setFormErrors] = useState({});

  const [formValues, setFormValues] = useState({
    email: extractedText.email || "",
    password: extractedText.password || "",
    confirmPassword: extractedText.confirmPassword || "",
    phoneNumber: extractedText.phoneNumber || "",
  });

  useEffect(() => {
    setFormValues({
      email: extractedText.email || "",
      password: extractedText.password || "",
      confirmPassword: extractedText.confirmPassword || "",
      phoneNumber: extractedText.phoneNumber || "",
    });
  }, [extractedText]);

  const handleUploadClick = (type) => {
    const fileInput = document.getElementById(
      type === "front" ? "frontFileInput" : "profileFileInput"
    );
    fileInput.click();
  };

  const handleFileInputChange = (e, type) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === "front") {
          setSelectedFrontImage(reader.result);
          dispatch(updateFormValues({ frontImage: reader.result }));
        } else {
          setSelectedProfileImage(reader.result);
          dispatch(updateFormValues({ profileImage: reader.result }));
        }
      };
      reader.readAsDataURL(file);
      sendImageToBackend(file, type);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const sendImageToBackend = async (imageFile, type) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      if (type === "front") {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const extractedTextData = response.data.text;
        parseExtractedText(extractedTextData);
      } else {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/uploadProfile`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const parseExtractedText = (text) => {
    const nameRegex = /Name\s*(.*)\n/;
    const fatherNameRegex = /Father Name\s*(.*)\n/;
    const cnicNumberRegex = /Identity Number\s*(.*)\n/;
    const dobRegex = /Date of Birth\s*(.*)\n/;
    const genderRegex = /Gender\s*[\s\S]*?\n([MF])/;

    const nameMatch = text.match(nameRegex);
    const fatherNameMatch = text.match(fatherNameRegex);
    const cnicNumberMatch = text.match(cnicNumberRegex);
    const dobMatch = text.match(dobRegex);
    const genderMatch = text.match(genderRegex);

    const newText = {};

    if (nameMatch) {
      newText.name = nameMatch[1].trim();
    }

    if (fatherNameMatch) {
      newText.fatherName = fatherNameMatch[1].trim();
    }

    if (cnicNumberMatch) {
      newText.cnicNumber = cnicNumberMatch[1].trim();
    }

    if (dobMatch) {
      newText.dateOfBirth = dobMatch[1].trim();
    }

    if (genderMatch) {
      newText.gender = genderMatch[1];
    }

    dispatch(setExtractedText({ ...newText, ...formValues }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    dispatch(updateFormValues({ [name]: value }));
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    const errors = {};

    // Validation for email, password, confirmPassword, and phoneNumber
    Object.keys(formValues).forEach((field) => {
      if (!formValues[field]) {
        errors[field] = "This field is required";
      }
    });

    // Password and Confirm Password validation
    if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (formValues.password && formValues.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    // Image validation
    if (!selectedFrontImage) {
      errors.frontImage = "CNIC image (front) is required";
    }

    if (!selectedProfileImage) {
      errors.profileImage = "Profile picture is required";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setPage("Personal", { extractedText });
    }
  };

  return (
    <>
      <fieldset>
        <form>
          <div className="inputSeperation">
            <div className="inputField">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleInputChange}
                style={{
                  borderColor: formErrors.email ? "red" : "",
                }}
              />
              {formErrors.email && <p className="error">{formErrors.email}</p>}
            </div>
            <div className="inputField">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleInputChange}
                style={{
                  borderColor: formErrors.password ? "red" : "",
                }}
              />
              {formErrors.password && (
                <p className="error">{formErrors.password}</p>
              )}
            </div>
            <div className="inputField">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formValues.confirmPassword}
                onChange={handleInputChange}
                style={{
                  borderColor: formErrors.confirmPassword ? "red" : "",
                }}
              />
              {formErrors.confirmPassword && (
                <p className="error">{formErrors.confirmPassword}</p>
              )}
            </div>
            <div className="inputField">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formValues.phoneNumber}
                onChange={handleInputChange}
                style={{
                  borderColor: formErrors.phoneNumber ? "red" : "",
                }}
              />
              {formErrors.phoneNumber && (
                <p className="error">{formErrors.phoneNumber}</p>
              )}
            </div>
          </div>

          <div className="cnicContainer">
            <div className="cnic">
              <button type="button" onClick={() => handleUploadClick("front")}>
                Upload
              </button>
              <label>Upload CNIC Image (Front)</label>
              <input
                type="file"
                id="frontFileInput"
                onChange={(e) => handleFileInputChange(e, "front")}
                style={{ display: "none" }}
              />
              {formErrors.frontImage && (
                <p className="error">{formErrors.frontImage}</p>
              )}

              {selectedFrontImage && (
                <div className="cnicPic">
                  <p>Selected Image:</p>
                  <img
                    src={selectedFrontImage}
                    alt="Selected"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                </div>
              )}
            </div>

            <div className="cnic">
              <button
                type="button"
                onClick={() => handleUploadClick("profile")}
              >
                Upload
              </button>
              <label>Upload your Picture</label>
              <input
                type="file"
                id="profileFileInput"
                onChange={(e) => handleFileInputChange(e, "profile")}
                style={{
                  display: "none",
                  borderColor: formErrors.profileImage ? "red" : "",
                }}
              />
              {formErrors.profileImage && (
                <p className="error">{formErrors.profileImage}</p>
              )}
              {selectedProfileImage && (
                <div className="cnicPic">
                  <p>Selected Image:</p>
                  <img
                    src={selectedProfileImage}
                    alt="Selected"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="controlButtons">
            <div className="prevButtonContainer">
              <button className="prevBtn" style={{ display: "none" }}>
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

export default Signup;
