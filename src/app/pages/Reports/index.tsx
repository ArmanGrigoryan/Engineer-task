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
      dateCreated: 0,
    });
    
    // const [activeReport, setActiveReport] = useState({} as typeof rows[0]);
    const [userReports, setUserReports] = React.useState<ReportInterface[]>([]);

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

    const showReportsHandler = (row: any) => () => {
        if (activeReport.id === row.id) setActiveReport({});
        else {
            setActiveReport(row);

            const userReports = (data as ReportInterface[]).filter(each => each.userId === row.id);
            setUserReports(userReports);
        }
    }

    const dataRows = useMemo(() => {
        if (data) {
            let mappingData = data as ReportInterface[];
            if (filter) {
                const elements = data.filter((each: any) => each.userId == Number(filter)) as ReportInterface;
                mappingData = elements ? elements : [] as ReportInterface[];
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
      setPopupData((prev: typeof popupData) => ({
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
                    activeReport={activeReport} 
                    userReports={userReports}
                    showReportsHandler={showReportsHandler}
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