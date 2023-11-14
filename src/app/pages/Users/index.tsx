import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import DataTable from "comp/dataTable";
import { useFetch } from "utils/hooks/useFetch"
import { useLocation } from "react-router-dom";
import { UserInterface } from "utils/interfaces/data";
import { createUsersDataRow } from "utils/helper";
import CircularProgress from '@mui/material/CircularProgress';

export default function Users(): React.ReactElement {
    const [disableFetching, setDisableFetching] = useState<boolean>(false);
    const location = useLocation();

    const scrollRef = useRef();

    const { data, reports, appendHandler, loading } = useFetch(location.pathname);

    const dataRows = useMemo(() => data && data.map(each => createUsersDataRow(each as UserInterface)), [data]);

    const scrollHandler = () => {
        const rect = (scrollRef.current as any)?.getBoundingClientRect();
        const isBottomVisible = (window.scrollY + window.innerHeight > rect.height + 205);

        if (isBottomVisible && !loading && !disableFetching) {
            appendHandler();
            setDisableFetching(true);
            setTimeout(() => setDisableFetching(false), 2000);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler);

        return () => {
            localStorage.removeItem("data");
            window.removeEventListener("scroll", scrollHandler);
        }
    }, []);

    return (
        <Box>
            <Typography variant="h4" className="text-center pb-30">Users page</Typography>
            {
                <Box ref={scrollRef}>
                    <DataTable 
                        isUsersPage={location.pathname === "/users"} 
                        rows={dataRows}
                        reports={reports}
                    />
                    {
                        disableFetching || loading ?
                        <Box textAlign="center">
                            <CircularProgress />
                        </Box> :
                        null
                    }
                </Box>
            }
        </Box>
    )
}