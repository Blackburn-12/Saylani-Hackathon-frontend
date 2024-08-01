// redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user`, config); // Adjust the endpoint as needed
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        console.log('Fetch Failed:', action.error);
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
