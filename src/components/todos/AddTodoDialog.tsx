import * as React from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {type SelectChangeEvent} from '@mui/material/Select';
import DateRangePicker from "../DateRangePicker.tsx"
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";


const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function AddTodoDialog({onClose}: any) {
    const [searchParams] = useSearchParams();

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [note, setNote] = React.useState('');
    const [priority, setPriority] = React.useState('');
    const [dateRange, setDateRange] = React.useState(["",""] as [string, string]);
    const todoListId = searchParams.get("id");

    useEffect(() => {
        setTitle("");
        setNote("");

        if(todoListId === "2") {
            setPriority("very high");
        } else {
            setPriority("");
        }

        if(todoListId === "0") {
            const date = new Date().toISOString().split('T')[0]
            setDateRange([date, date]);
        } else if (todoListId === "1") {
            const date1 = new Date();
            date1.setDate(date1.getDate() - date1.getDay() + 1);
            const date2 = new Date();
            date2.setDate(date2.getDate() - date2.getDay() + 7);
            setDateRange([date1.toISOString().split('T')[0], date2.toISOString().split('T')[0]]);
        }else {
            setDateRange(["", ""]);
        }

    }, [open]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        let id = searchParams.get("id");
        if (id !== null && id.length <= 4) {
            onClose(
                {
                    userId: localStorage.getItem("userId"),
                    title: title,
                    note: note,
                    checked: false,
                    tags: {
                        priority: priority,
                        deadline: dateRange,
                    },
                }
            );
        } else {
            onClose(
                {
                    userId: localStorage.getItem("userId"),
                    todoListId: searchParams.get("id") || undefined,
                    title: title,
                    note: note,
                    checked: false,
                    tags: {
                        priority: priority,
                        deadline: dateRange,
                    },
                }
            );
        }
        setOpen(false);

    };

    const toYMD = (d: Date): string => {
        const pad = (n: number) => String(n).padStart(2, "0");
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    };

    const dateHandler = (range: [Date, Date]) => {
        setDateRange([toYMD(range[0]), toYMD(range[1])]);
    }


    const handlePriorityChange = (event: SelectChangeEvent) => {
        setPriority(event.target.value);
    };

    return (
        <React.Fragment>
            <Fab color="primary" aria-label="add" onClick={handleClickOpen}
                 sx={{position: 'fixed', top: 32, right: 32}}>
                <AddIcon/>
            </Fab>
            <BootstrapDialog
                onClose={() => setOpen(false)}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                    Add Todo
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setOpen(false)}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent dividers>
                    <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                        <FormControl variant="standard" fullWidth={true} margin={"normal"}>

                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Title"
                                variant="standard"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                sx={{marginBottom: 2}}
                            />

                            <TextField
                                id="standard-multiline-flexible"
                                label="Note"
                                multiline
                                fullWidth
                                maxRows={4}
                                variant="standard"
                                value={note}
                                onChange={(event) => setNote(event.target.value)}
                                sx={{marginBottom: 2}}
                            />
                            <FormControl variant="standard" sx={{marginBottom: 2}}>
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

                            <DateRangePicker existingRange={dateRange} onChange={(range) => dateHandler(range)}/>
                        </FormControl>

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
