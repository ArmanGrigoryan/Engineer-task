import React, { Fragment } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/AddBox';
import { Box, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReportInterface } from "utils/interfaces/data";

interface DataTable {
    rows: Array<any>;
    reports?: Array<ReportInterface>;
    loading?: boolean;
    isUsersPage?: boolean;
    createAction?: (params: null) => () => void;
    editAction?: (params: ReportInterface) => () => void;
    deleteAction?: (id: number) => () => void;
    activeReport: any;
    userReports: ReportInterface[];
    showReportsHandler: (row: any) => () => void;
}

export default function DataTable({ 
    isUsersPage, 
    rows,
    loading,
    editAction,
    createAction,
    deleteAction,
    activeReport, 
    userReports,
    showReportsHandler
}: DataTable): React.ReactElement {

    return (
        <TableContainer component={Paper} className="my-20">
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    {
                        isUsersPage ?
                        (
                            <>
                                <TableCell>ID</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Created Date</TableCell>
                                <TableCell align="center">Show Reports</TableCell>
                            </>
                        ) :
                        (
                            <>
                                <TableCell>ID</TableCell>
                                <TableCell align="center">User ID</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Content</TableCell>
                                <TableCell align="center">Created Date</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </>
                        )
                    }
                </TableRow>
                </TableHead>
                <TableBody>
                {
                    rows?.map(row => (
                        <Fragment key={row.id + Math.random()}>
                            <TableRow
                                key={row.id + Math.random()}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {
                                    isUsersPage ?
                                    <>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="center">{row.name}</TableCell>
                                        <TableCell align="center">{row.email}</TableCell>
                                        <TableCell align="center">{new Date(row.dateCreated).toLocaleString()}</TableCell>
                                        <TableCell align="center" className=" p-20">
                                            <ExpandMoreIcon 
                                                className={activeReport?.id === row.id ? "rotate-180 transition-all cursor-pointer" : "transition-all cursor-pointer"}
                                                onClick={showReportsHandler && showReportsHandler(row)} 
                                            />
                                        </TableCell>
                                    </> :
                                    <>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="center">{row.userId}</TableCell>
                                        <TableCell align="center">{row.title}</TableCell>
                                        <TableCell align="center">{row.content}</TableCell>
                                        <TableCell align="center">{new Date(row.dateCreated).toLocaleString()}</TableCell>
                                        <TableCell align="center" className="flex items-center">
                                            <Box display="flex" alignItems="center" gap="10px">
                                                <IconButton
                                                    size="large"
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="menu"
                                                    className="focus:outline-0"
                                                    onClick={editAction && editAction(row)}
                                                    disabled={loading}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    size="large"
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="menu"
                                                    className="focus:outline-0"
                                                    onClick={deleteAction && deleteAction(row.id)}
                                                    disabled={loading}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton
                                                    size="large"
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="menu"
                                                    className="focus:outline-0"
                                                    onClick={createAction && createAction(null)}
                                                    disabled={loading}
                                                >
                                                    <CreateIcon />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </>
                                }
                            </TableRow>

                            {
                                activeReport?.id === row.id ?
                                userReports && userReports.map(({ content, dateCreated, id, title }) => (
                                    <TableRow key={id} className="mb-20 bg-lightgray">
                                        <TableCell component="th" scope="row">{id}</TableCell>
                                        <TableCell align="center">{title}</TableCell>
                                        <TableCell colSpan={2} align="center" className="max-w-[300px]">{content}</TableCell>
                                        <TableCell align="center">{new Date(dateCreated).toLocaleString()}</TableCell>
                                    </TableRow> 
                                )) :
                                null
                            }
                        </Fragment>

                    ))
                }
                </TableBody>
            </Table>
        </TableContainer>
    )
}