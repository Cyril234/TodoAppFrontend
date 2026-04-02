import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import design from '../../../design.json';
import TodoInformation from "./TodoInformation.tsx"
import {Chip} from "@mui/material";
import Stack from "@mui/material/Stack";
import type {Todo, Priority} from "../shared/types/common.types.ts";


type TodoListItemProps = {
    key: string
    todo: Todo;
    index: number;
    checkTodo: (_id: string) => void;
    updateTodo: (updatedTodo: Todo, title: string, note: string, priority: Priority, deadline: [string, string]) => void;
    deleteTodo: (todo: Todo) => void;
};

function TodoListItem({todo, index, checkTodo, updateTodo, deleteTodo}: TodoListItemProps) {
    const [infoOpen, setInfoOpen] = React.useState(false);

    const handleOpenInfo = () => {
        setInfoOpen(true);
    };

    const handleCloseInfo = () => {
        setInfoOpen(false);
    };

    const renderPriorityIcon = (priority: string) => {
        switch (priority) {
            case 'very high':
                return <Chip icon={<KeyboardDoubleArrowUpRoundedIcon/>} label="very high" variant="outlined" sx={{ '& .MuiChip-icon': { color: "#e0483d" }}}/>
            case 'high':
                return <Chip icon={<KeyboardArrowUpRoundedIcon/>} label="high" variant="outlined" sx={{ '& .MuiChip-icon': { color: "#e3736b" }}}/>
            case 'medium':
                return <Chip icon={<HorizontalRuleRoundedIcon/>} label="medium" variant="outlined"/>
            case 'low':
                return <Chip icon={<KeyboardArrowDownRoundedIcon/>} label="low" variant="outlined" sx={{ '& .MuiChip-icon': { color: "#6fc0dd" }}}/>
            case 'very low':
                return <Chip icon={<KeyboardDoubleArrowDownRoundedIcon/>} label="very low" variant="outlined" sx={{ '& .MuiChip-icon': { color: "#18a9dd" }}}/>
        }
    };

    const renderDeadlineIcon = (deadline: [string, string]) => {
        if (!deadline || deadline.length !== 2 || (!deadline[0] && !deadline[1])) {
            return null;
        }
        if (deadline[0] === deadline[1]) {
            if(deadline[0] < new Date().toISOString().split('T')[0]) {
                return (
                    <Chip icon={<CalendarMonthIcon/>} label={deadline[0]} variant="outlined" sx={{ '& .MuiChip-icon': { color: "#e0483d" }}}/>
                );
            } else {
                return (
                    <Chip icon={<CalendarMonthIcon/>} label={deadline[0]} variant="outlined"/>
                );
            }
        } else {
            if(deadline[1] < new Date().toISOString().split('T')[0]) {
                return (
                    <Chip icon={<CalendarMonthIcon/>} label={deadline[0] + " - " + deadline[1]} variant="outlined" sx={{ '& .MuiChip-icon': { color: "#e0483d" }}}/>
                );
            } else {
                return (
                    <Chip icon={<CalendarMonthIcon/>} label={deadline[0] + " - " + deadline[1]} variant="outlined"/>
                );
            }
        }
    };

    const labelId = `todo-checkbox-${index}`;
//onClick={() => setInfoOpen(false)}
    return (
        <ListItem disablePadding sx={{marginBottom: 1, bgcolor: design.backgroundColourGray, borderRadius: 2}}>
            <ListItemButton role={undefined} dense onClick={handleOpenInfo}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={todo.checked}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{'aria-labelledby': labelId}}
                        onClick={(event) => event.stopPropagation()}
                        onChange={() => {
                            checkTodo(todo._id)
                        }}
                    />
                </ListItemIcon>
                <ListItemText id={labelId} primary={todo.title}/>

                <Stack direction="row" spacing={1}>
                    {renderPriorityIcon(todo.tags.priority)}
                    {renderDeadlineIcon(todo.tags.deadline)}
                </Stack>

            </ListItemButton>
            <TodoInformation
                todo={todo}
                open={infoOpen}
                onClose={handleCloseInfo}
                onOpen={handleOpenInfo}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
            />
        </ListItem>
    );
}

export default TodoListItem;
