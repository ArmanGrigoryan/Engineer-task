import { createSlice } from '@reduxjs/toolkit'
import { getData } from '../../actions';
import { DataInterface } from '../../../utils/interfaces/data';

export interface CurrencyState {
  data: DataInterface;
  prev: DataInterface;
}

const initialState: CurrencyState = {
  data: {} as DataInterface,
  prev: {} as DataInterface,
}

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, { payload }) => {
      if (!state.data) state.data = payload;
      else {
        state.prev = state.data;
        state.data = payload;
      }
    });
  }
})

export default currencySlice.reducer;