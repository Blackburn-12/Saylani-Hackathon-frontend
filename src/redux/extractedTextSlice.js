import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  fatherName: "",
  cnicNumber: "",
  dateOfBirth: "",
  gender: "",
  phoneNumber: "",
  email: "",
  password: "",
  confirmPassword: "",
  coursePreference: "",
  campusPreference: "",
  classPreference: "",
  qualification: "",
  hasLaptop: "",
  frontImage: null,
  profileImage: null,
};

const extractedTextSlice = createSlice({
  name: "extractedText",
  initialState,
  reducers: {
    setExtractedText: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateFormValues: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFormValues: (state) => {
      return { ...initialState };
    },
  },
});

export const { setExtractedText, updateFormValues, resetFormValues } = extractedTextSlice.actions;

export default extractedTextSlice.reducer;
