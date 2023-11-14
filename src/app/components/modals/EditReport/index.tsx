import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ReportInterface, ReportsStateInterface } from 'utils/interfaces/data';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useAppSelector } from 'store';
import { stateSelector } from 'store/slices/reportsSlice';

interface ModalProps {
    open: boolean;
    hasError: boolean;
    data: Partial<ReportInterface>;
    changeHandler: (evt: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<number>) => void;
    handleClose: () => void;
    handleSubmit: () => void;
}

export default function EditReport({ 
  open,
  data,
  hasError,
  handleClose, 
  changeHandler,
  handleSubmit 
}: ModalProps) {
  const { filterValues: usersData } = useAppSelector(stateSelector) as ReportsStateInterface;

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter data, please</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Title refers to this report to be created
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            id="title"
            label="Title"
            type="text"
            variant="standard"
            fullWidth
            required
            error={!data.title && hasError}
            value={data.title}
            onChange={changeHandler as (evt: React.ChangeEvent<HTMLInputElement>) => void}
          />
        </DialogContent>

        <DialogContent>
          <DialogContentText>
            Content refers to details for this report
            Fill it with huge texts, essays or simple messages
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="content"
            id="content"
            label="Content"
            type="text"
            variant="standard"
            fullWidth
            required
            error={!data.content && hasError}
            value={data.content}
            onChange={changeHandler as (evt: React.ChangeEvent<HTMLInputElement>) => void}
          />
        </DialogContent>

        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="userId">User</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="userId"
              name="userId"
              label="Age"
              required
              error={!data.userId && hasError}
              value={data.userId}
              onChange={changeHandler as (evt: SelectChangeEvent<number>) => void}
            >
              {
                usersData?.map((each: any) => (
                  <MenuItem key={each.id} value={each.id}>{ each.label }</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}