import { createSlice } from '@reduxjs/toolkit'
import { createReport, deleteReportById, editReportById, getReportsData, getUsersData } from 'store/actions';
import { ReportsStateInterface, UserInterface } from 'utils/interfaces/data';
import { RootState } from '../..';
import { toast } from 'react-toastify';

const initialState: ReportsStateInterface = {
  data: [],
  filterValues: [],
  loading: false,
  hasError: false,
  errorMessage: "",
}

export const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getReportsData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReportsData.rejected, (state, { payload }) => {
      state.loading = false;
      state.hasError = true;

      state.errorMessage = (payload as any)?.message;
      toast((payload as any)?.message || "Error happened while getting Reports data");
    });
    builder.addCase(getReportsData.fulfilled, (state, { payload }) => {
      state.hasError = false;
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(getUsersData.fulfilled, (state, { payload }) => {
      state.filterValues = payload.map((each: UserInterface)  => ({
        label: each.name,
        id: each.id,
      }));
    });
    builder.addCase(deleteReportById.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(deleteReportById.rejected, (state, { payload }) => {
      state.loading = false;
      state.hasError = true;

      state.errorMessage = (payload as any)?.message;
      toast((payload as any)?.message || "Error happened while deleting Report");
    })
    builder.addCase(deleteReportById.fulfilled, (state) => {
      state.hasError = false;
      state.loading = false;
    })
    builder.addCase(editReportById.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(editReportById.rejected, (state, { payload }) => {
      state.loading = false;
      state.hasError = true;

      state.errorMessage = (payload as any)?.message;
      toast((payload as any)?.message || "Error happened while updating Report");
    })
    builder.addCase(editReportById.fulfilled, (state) => {
      state.hasError = false;
      state.loading = false;
    })
    builder.addCase(createReport.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(createReport.rejected, (state, { payload }) => {
      state.loading = false;
      state.hasError = true;

      state.errorMessage = (payload as any)?.message;
      toast((payload as any)?.message || "Error happened while creating Report");
    })
    builder.addCase(createReport.fulfilled, (state) => {
      state.hasError = false;
      state.loading = false;
    })
  }
});

export const stateSelector = (state: RootState) => state.reports;

export default reportsSlice.reducer;