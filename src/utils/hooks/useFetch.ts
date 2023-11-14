import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { createReport, deleteReportById, editReportById, getReportsData, getUsersData } from "store/actions";
import { stateSelector as usersStateSelector } from "store/slices/usersSlice";
import { stateSelector as reportsStateSelector } from "store/slices/reportsSlice";
import { ReportInterface, ReportsStateInterface, UsersStateInterface } from "../interfaces/data";
import { PayloadAction } from "@reduxjs/toolkit";

type ReturnDataType = UsersStateInterface | ReportsStateInterface & Omit<UsersStateInterface, "data">;

export const useFetch = (url: string) => {
    const dispatch = useAppDispatch();

    const dataSelector = useMemo(() => url === "/users" ?
        usersStateSelector :
        reportsStateSelector,
    []);

    const { data, reports, loading } = useAppSelector(dataSelector) as ReturnDataType;

    const appendHandler = () => {
        const extData = [...data];
        localStorage.setItem("data", JSON.stringify(extData));
        setTimeout(() => dispatch(getUsersData()), 2000);
    };

    const deleteReportHandler: (id: number) => Promise<PayloadAction<any>> = (id: number) => dispatch(deleteReportById(id)).finally(() => dispatch(getReportsData()));

    const editReportHandler: (params: Partial<ReportInterface>) => 
        Promise<PayloadAction<any>> = (params) => 
            dispatch(editReportById({ ...params })).then(() => dispatch(getReportsData()));

    const createReportHandler: (params: Partial<ReportInterface>) => 
        Promise<PayloadAction<any>> = (params) => 
            dispatch(createReport({ ...params })).then(() => dispatch(getReportsData()));

    useEffect(() => {
        const dispObj1 = dispatch(getUsersData());
        const dispObj2 = dispatch(getReportsData());

        return () => {
            // this causes errors in development
            dispObj1.abort();
            dispObj2.abort();
        }
    }, []);

    return { 
        data, 
        reports, 
        loading, 
        appendHandler,
        deleteReportHandler,
        editReportHandler,
        createReportHandler,
    };
};