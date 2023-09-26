import { createAsyncThunk } from '@reduxjs/toolkit';
import { formatterByResponse } from '../../utils/helpers';
import axios from '../axios';

export const getData = createAsyncThunk(
  'currency/get',
  async () => {
    const { data } = await axios.get('');

    const result = formatterByResponse(data);
    return result;
  },
);