import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import reportsReducer from './slices/reportsSlice';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    "users": usersReducer,
    "reports": reportsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector = useSelector<RootState>;