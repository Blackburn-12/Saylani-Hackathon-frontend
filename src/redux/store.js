import { configureStore } from '@reduxjs/toolkit';
import extractedTextReducer from './extractedTextSlice';
import userReducer from './userSlice'; // Import the user reducer

const store = configureStore({
  reducer: {
    extractedText: extractedTextReducer,
    user: userReducer, // Add the user reducer
  },
});

export default store;
