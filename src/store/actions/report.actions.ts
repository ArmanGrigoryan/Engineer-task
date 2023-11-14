import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';
import { ReportInterface } from 'utils/interfaces/data';

export const getReportsData = createAsyncThunk(
  'reports/get',
  async () => {
    const { data } = await axios.get('/reports');

    return data;
  },
);

export const deleteReportById = createAsyncThunk(
  'reports/delete',
  async (id: number) => {
    const { data } = await axios.delete(`/reports/${id}`);

    return data;
  },
);

export const editReportById = createAsyncThunk(
  'reports/edit',
  async ({ 
    id,
    userId,
    content,
    title,
    dateCreated,
  }: Partial<ReportInterface>) => {
    const { data } = await axios.put(`/reports/${id}`, {
      userId,
      title,
      content,
      dateCreated,
    });

    return data;
  },
);

export const createReport = createAsyncThunk(
  'reports/create',
  async ({
    userId,
    content,
    title,
  }: Partial<ReportInterface>) => {
    const { data } = await axios.post(`/reports`, {
      userId,
      title,
      content,
      dateCreated: Date.now(),
    });

    return data;
  },
);