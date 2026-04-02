import * as React from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {useEffect} from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import design from '../../../design.json';

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function AddTodoDialog({onClose}: any) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');

    useEffect(() => {
        setName("");
    }, [open]);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        onClose(name);
    };

    return (
        <React.Fragment>
            <ListItemButton
                onClick={handleClickOpen}
                sx={{bgcolor: design.backgroundColourGray,}}
            >
                <ListItemIcon>
                    <AddIcon/>
                </ListItemIcon>
                <ListItemText primary="Add Todolist"/>
            </ListItemButton>

            <BootstrapDialog
                onClose={() => setOpen(false)}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                    Add Todolist
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
                        <TextField
                            fullWidth
                            id="standard-basic"
                            label="Title"
                            variant="standard"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
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
