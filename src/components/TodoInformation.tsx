import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TextField from '@mui/material/TextField';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Button from '@mui/material/Button';
import DateRangePicker from "./DateRangePicker.tsx"
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";


type Anchor = 'top' | 'left' | 'bottom' | 'right';

/*type Todo = {
    title: string;
    note: string;
    checked: boolean;
    tags: {
        priority: Priority;
        deadline: [string, string];
    };
};*/

type Todo = {
    _id: string;
    userId?: string;
    todoListId?: string;
    title: string;
    note: string;
    checked: boolean;
    tags: {
        priority: Priority;
        deadline: [string, string];
    };
};


type TodoInformationProps = {
    todo: Todo;
    open: boolean;
    onClose: () => void;
    onOpen: () => void;
    updateTodo: (updatedTodo: Todo, title: string, note: string, priority: Priority, dateRange: [string, string]) => void;
    deleteTodo: (todo: Todo) => void;
};

type Priority = 'very low' | 'low' | 'medium' | 'high' | 'very high';

export default function TodoInformation({todo, open, onClose, onOpen, updateTodo, deleteTodo}: TodoInformationProps) {
    const [note, setNote] = React.useState(todo.note);
    const [title, setTitle] = React.useState(todo.title);
    const [dateRange, setDateRange] = React.useState<[string, string]>(todo.tags.deadline);
    const [priority, setPriority] = React.useState(todo.tags.priority);


    React.useEffect(() => {
        setNote(todo.note)
    }, [open]);

    const toYMD = (d: Date): string => {
        const pad = (n: number) => String(n).padStart(2, "0");
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    };

    const dateHandler = (range: [Date, Date]) => {
        setDateRange([toYMD(range[0]), toYMD(range[1])]);
    }

    const list = (anchor: Anchor) => (
        <Box
            sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 700}}
            role="presentation"
        >
            <CloseRoundedIcon onClick={onClose}/>
            <Divider/>

            <Box sx={{margin: 2}}>

                <FormControl variant="standard" fullWidth={true}>

                    <TextField
                        style={{width: "100%"}}
                        id="outlined-textarea"
                        placeholder="title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        sx={{marginBottom: 2}}
                    />
                    <TextField
                        style={{width: "100%"}}
                        id="outlined-textarea"
                        placeholder="Note"
                        multiline
                        onChange={(e) => setNote(e.target.value)}
                        value={note}
                        sx={{marginBottom: 2}}
                    />
                    <FormControl variant="standard" sx={{marginBottom: 2}}>
                        <InputLabel id="demo-simple-select-standard-label">priority</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={priority}
                            onChange={(e) => {
                                setPriority(e.target.value);
                            }}
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
                    <DateRangePicker onChange={(range) => dateHandler(range)} existingRange={dateRange}/>
                </FormControl>
            </Box>

            <Divider/>

            <Button variant="contained" sx={{margin: 2}} onClick={() => {
                updateTodo(todo, title, note, priority, dateRange);
                onClose();
            }}>Save</Button>
            <Button color="error" variant="contained" onClick={() => {
                deleteTodo(todo);
                onClose();
            }}>Delete</Button>
        </Box>
    );

    return (
        <div>
            <React.Fragment key={'right'}>
                <SwipeableDrawer
                    anchor={'right'}
                    open={open}
                    onOpen={onOpen}
                    onClose={onClose}
                >
                    {list('right')}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}
