import { createSlice } from '@reduxjs/toolkit'
import { getReportsData, getUsersData } from 'store/actions';
import { UsersStateInterface } from 'utils/interfaces/data';
import { toast } from 'react-toastify';
import { RootState } from '../..';

const initialState: UsersStateInterface = {
  data: [],
  reports: [],
  loading: false,
  hasError: false,
  errorMessage: "",
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUsersData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsersData.rejected, (state, { payload }) => {
      state.loading = false;
      state.hasError = true;

      state.errorMessage = (payload as any)?.message;
      toast((payload as any)?.message || "Error happened while getting Users data");
    });
    builder.addCase(getUsersData.fulfilled, (state, { payload }) => {
      state.hasError = false;
      state.loading = false;

      const infiniteScrollData = JSON.parse(localStorage.getItem("data") as string);
      if (infiniteScrollData) state.data = [...state.data, ...payload];
      else state.data = payload;
    });
    builder.addCase(getReportsData.fulfilled, (state, { payload }) => {
      state.reports = payload;
    });
  }
});

export const stateSelector = (state: RootState) => state.users;

export default usersSlice.reducer;