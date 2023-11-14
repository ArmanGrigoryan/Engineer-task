import React, { useContext, useMemo } from "react";
import { Box, SelectChangeEvent, Typography } from "@mui/material";
import { useFetch } from "utils/hooks/useFetch";
import { useLocation } from "react-router-dom";
import { createReportsDataRow } from "utils/helper";
import { ReportInterface } from "utils/interfaces/data";
import CircularProgress from '@mui/material/CircularProgress';
import DataTable from "comp/dataTable";
import withFiltering from "comp/HOC/withFiltering";
import EditReport from "comp/modals/EditReport";
import { FilterContext } from "../../App";


export default function Reports(): React.ReactElement {
    const [open, setOpen] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    const [activeReport, setActiveReport] = React.useState<ReportInterface | null>(null);
    const [popupData, setPopupData] = React.useState<Partial<ReportInterface>>({
      title: "",
      content: "",
      userId: 0,
    });

    const { filter } = useContext(FilterContext);

    const DataTableWithFiltering = useMemo(() => withFiltering(DataTable as React.FC) as any, []);

    const location = useLocation();

    const { 
        data, 
        loading, 
        deleteReportHandler, 
        editReportHandler,
        createReportHandler,
    } = useFetch(location.pathname);

    const dataRows = useMemo(() => {
        if (data) {
            let mappingData = data as ReportInterface[];
            if (filter) {
                const element = data.find((each: any) => each.userId == Number(filter)) as ReportInterface;
                mappingData = element ? [element] : [] as ReportInterface[];
            }
            return mappingData.map(each => createReportsDataRow(each as ReportInterface));
        } 
    }, [data, filter]);

    const handleCloseModal = () => {
      setOpen(false);
      setHasError(false);
      setActiveReport(null);
      setPopupData({
        title: "",
        content: "",
        userId: 0,
        dateCreated: 0,
      });
    };

    const handleOpenModal = (item: ReportInterface) => () => {
      setOpen(true);
      setActiveReport(item);
      setPopupData({
        title: item?.title || "",
        content: item?.content || "",
        userId: item?.userId || 0,
        dateCreated: item?.dateCreated || 1,
      });
    };

    const dataChangeHandler = (evt: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<number>) => {
      const { name, value } = evt.target;
      setPopupData(prev => ({
        ...prev,
        [name]: value,
      }))
    }

    const deleteHandler = (id: number) => () => deleteReportHandler(id);

    const editHandler = () => editReportHandler({ ...popupData, id: activeReport?.id }).then(handleCloseModal);

    const createHandler = () => createReportHandler({ ...popupData }).then(handleCloseModal);

    const handleSubmitData = () => {
        if (Object.values(popupData).some(each => !each)) return setHasError(true);

        activeReport ? 
            editHandler() :
            createHandler();
    }

    return (
        <Box>
            <Typography variant="h4" className="text-center pb-30">Reports page</Typography>

            {
                loading ?
                <Box textAlign="center">
                    <CircularProgress />
                </Box> :
                <DataTableWithFiltering 
                    isUsersPage={location.pathname === "/users"} 
                    rows={dataRows as ReportInterface[]} 
                    loading={loading}
                    editAction={handleOpenModal}
                    createAction={handleOpenModal}
                    deleteAction={deleteHandler}
                />
            }

            <EditReport 
                open={open}
                hasError={hasError}
                data={popupData}
                changeHandler={dataChangeHandler}
                handleClose={handleCloseModal}
                handleSubmit={handleSubmitData}
            />
        </Box>
    )
}