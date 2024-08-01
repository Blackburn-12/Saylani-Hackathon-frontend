import React, { useState } from "react";
import "./Course.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetFormValues, updateFormValues } from "../redux/extractedTextSlice";
import { toast, ToastContainer } from "react-toastify";

import axios from "axios";
import QRCode from "qrcode";

const Course = ({ setPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const extractedText = useSelector((state) => state.extractedText);

  const [formValues, setFormValues] = useState({
    coursePreference: extractedText.coursePreference || "",
    campusPreference: extractedText.campusPreference || "",
    classPreference: extractedText.classPreference || "",
    qualification: extractedText.qualification || "",
    hasLaptop: extractedText.hasLaptop || "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    dispatch(updateFormValues({ [name]: value }));
  };

  const handlePrevClick = () => {
    setPage("Personal");
  };

  const generateSixDigitNumber = async () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    const errors = {};
    Object.keys(formValues).forEach((field) => {
      if (!formValues[field]) {
        errors[field] = true;
      }
    });
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Show pending toast
      toast.info("Registration in progress...", {
        toastId: "pending-toast",
        pauseOnHover: false,
        autoClose: false,
        style: {
          backgroundColor: "#E0F7FA",
        },
      });

      try {
        const rollNumber = await generateSixDigitNumber();
        const qrCodeUrl = await QRCode.toDataURL(rollNumber);

        const { frontImage, profileImage, ...extractedTextWithoutImages } =
          extractedText;

        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/register`,
          {
            ...extractedTextWithoutImages,
            ...formValues,
            rollNumber,
            qrCodeUrl,
          }
        );

        if (response && response.data && response.data.token) {
          toast.update("pending-toast", {
            render: "Registration Successful!",
            type: "success",
            autoClose: 2000,
            style: {
              backgroundColor: "#E8F5E9",
            },
          });
          setTimeout(() => {
            localStorage.setItem("token", response.data.token);
            dispatch(resetFormValues());
            navigate("/dashboard");
          }, 2000);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          toast.update("pending-toast", {
            render: `Registration failed. ${error.response.data.msg}`,
            type: "error",
            autoClose: 3000,
            style: {
              backgroundColor: "#FFEBEE",
            },
          });
        } else {
          toast.update("pending-toast", {
            render: "Registration failed. Please try again.",
            type: "error",
            autoClose: 3000,
            style: {
              backgroundColor: "#FFEBEE",
            },
          });
        }
      }
    } else {
      toast.error("Please fill in all the fields.", {
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <fieldset>
        <form>
          <div className="inputSeperation">
            <div className="inputField">
              <label htmlFor="coursePreference">Select course or event</label>
              <select
                name="coursePreference"
                id="coursePreference"
                value={formValues.coursePreference}
                onChange={handleInputChange}
                style={{
                  borderColor: formErrors.coursePreference ? "red" : "",
                }}
              >
                <option value="">Select an option</option>
                <option value="Web and Mobile App">Web and Mobile App</option>
                <option value="Flutter">Flutter</option>
                <option value="Python">Python</option>
              </select>
            </div>
            <div className="inputField">
              <label htmlFor="campusPreference">Select campus</label>
              <select
                name="campusPreference"
                id="campusPreference"
                value={formValues.campusPreference}
                onChange={handleInputChange}
                style={{
                  borderColor: formErrors.campusPreference ? "red" : "",
                }}
              >
                <option value="">Select an option</option>
                <option value="Bahadurabad Campus">Bahadurabad Campus</option>
                <option value="Gulshan Campus">Gulshan Campus</option>
                <option value="Korangi Campus">Korangi Campus</option>
              </select>
            </div>
            <div className="inputField">
              <label htmlFor="classPreference">Select class preference</label>
              <select
                name="classPreference"
                id="classPreference"
                value={formValues.classPreference}
                onChange={handleInputChange}
                style={{
                  borderColor: formErrors.classPreference ? "red" : "",
                }}
              >
                <option value="">Select an option</option>
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
                <option value="Weekend">Weekend</option>
              </select>
            </div>
            <div className="inputField">
              <label htmlFor="qualification">Last qualification</label>
              <select
                name="qualification"
                id="qualification"
                value={formValues.qualification}
                onChange={handleInputChange}
                style={{
                  borderColor: formErrors.qualification ? "red" : "",
                }}
              >
                <option value="">Select an option</option>
                <option value="High School">High School</option>
                <option value="Bachelors">Bachelor's</option>
                <option value="Masters">Master's</option>
              </select>
            </div>
            <div className="inputField">
              <label htmlFor="hasLaptop">Do you have a Laptop?</label>
              <select
                name="hasLaptop"
                id="hasLaptop"
                value={formValues.hasLaptop}
                onChange={handleInputChange}
                style={{
                  borderColor: formErrors.hasLaptop ? "red" : "",
                }}
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <ol>
            <li>
              I hereby, solemnly declare that the data and facts mentioned
              herein are true and correct to the best of my knowledge. Further,
              I will abide by all the established and future regulations and
              policies of SWIT.
            </li>
            <li>
              I hereby accept the responsibilities of good conduct and guarantee
              that I will not be involved in any other activity, political or
              ethical, but learning during my stay in the program.
            </li>
            <li>
              Defiance will render my admission canceled at any point in time.
            </li>
            <li>
              Upon completion, of the course, I will complete the required
              project by SWIT.
            </li>
            <li>
              It's mandatory for female students to wear abaya/hijab in the
              class.
            </li>
          </ol>
          <div className="controlButtons">
            <div className="prevButtonContainer">
              <button className="prevBtn" onClick={handlePrevClick}>
                Back
              </button>
            </div>
            <div className="nextButtonContainer">
              <button onClick={handleSubmitClick} className="submitBtn">
                Submit
              </button>
            </div>
          </div>
        </form>
      </fieldset>
      <ToastContainer />
    </>
  );
};

export default Course;
