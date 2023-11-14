import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const getUsersData = createAsyncThunk(
  'users/get',
  async () => {
    const { data } = await axios.get('/users');

    return data;
  },
);