import * as React from 'react';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountMenu from "./AccountMenu.tsx";

import {useNavigate} from "react-router-dom";

type TodoList = {
    name: string;
    id: string;
};

function DrawerLeft() {
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const navigate = useNavigate();

    const formatForUrl = (text: string) => {
        return text.replace(" ", "-");
    }

    const handleListItemClick = (
        index: number,
        todolist: TodoList,
    ) => {
        setSelectedIndex(index);
        navigate("/?tab=" + formatForUrl(todolist.name)+"&id=" + todolist.id);
    };

    return (
        <div>
            <AccountMenu/>
            <Divider/>

            <List>
                {[{name: 'Today', id: "0"}, {name: 'This Weak', id: "1"}, {name: 'Important', id: "2"}, {name: 'All', id: "3"}].map((todolist, index) => (
                    <ListItemButton
                        selected={selectedIndex === index}
                        onClick={() => handleListItemClick(index, todolist)}
                    >
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={todolist.name}/>
                    </ListItemButton>
                ))}
            </List>
            <Divider/>
{/*            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItemButton
                        selected={selectedIndex === index + 4}
                        onClick={(event) => handleListItemClick(event, index + 4, text)}
                    >
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItemButton>
                ))}
            </List>*/}
        </div>
    )
}

export default DrawerLeft
