import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';

type TodoListMenuProps = {
    deleteTodoList: (withTodos: boolean) => void;
};

export default function TodoListMenu({ deleteTodoList }: TodoListMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleDelete = (withTodos: boolean) => {
        setAnchorEl(null);
        deleteTodoList(withTodos);
    };
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <ListAltRoundedIcon sx={{ mr: 2 }}/>
                    </IconButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="Todo-list-menu"
                open={open}
                onClose={handleMenuClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => handleDelete(true)}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    delete with todos
                </MenuItem>
                <MenuItem onClick={() => handleDelete(false)}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    delete without todos
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
