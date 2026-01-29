import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import DateRangePicker from "./DateRangePicker.tsx"


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AddTodoDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [note, setNote] = React.useState('');
  const [priority, setPriority] = React.useState('');
  const [dateRange, setDateRange] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    props.onClose(
        {
                            title: title,
                              note: note,
                              checked: false,
                              tags: {
                                priority: priority,
                                deadline: ['2026-01-28', '2026-01-28'] as [string, string],
                              },
                            }
                        )
  };
  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value);
  };

  return (
    <React.Fragment>
          <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Todo
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <div fullWidth>
            <TextField
              fullWidth
              id="standard-basic"
              label="Title"
              variant="standard"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            </div>
            <TextField
                id="standard-multiline-flexible"
                label="Note"
                 multiline
                 fullWidth
                maxRows={4}
                variant="standard"
                value={note}
                onChange={(event) => setNote(event.target.value)}
            />
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">priority</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={priority}
                      onChange={handlePriorityChange}
                      label="priority"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"very high"}>very high</MenuItem>
                      <MenuItem value={"high"}>high</MenuItem>
                      <MenuItem value={"medium"}>medium</MenuItem>
                      <MenuItem value={"low"}>low</MenuItem>
                      <MenuItem value={"very low"}>very low</MenuItem>
                    </Select>
                  </FormControl>

                  <DateRangePicker/>
            </Box>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
