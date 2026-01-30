import * as React from 'react';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountMenu from "./AccountMenu.tsx";

import {useNavigate} from "react-router-dom";

function DrawerLeft() {
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const navigate = useNavigate();

    const formatForUrl = (text: string) => {
        return text.replace(" ", "-");
    }

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
        text: string
    ) => {
        setSelectedIndex(index);
        navigate("/?tab=" + formatForUrl(text));
    };

    return (
        <div>
            <AccountMenu/>
            <Divider/>

            <List>
                {['Today', 'This Weak', 'Important', 'All'].map((text, index) => (
                    <ListItemButton
                        selected={selectedIndex === index}
                        onClick={(event) => handleListItemClick(event, index, text)}
                    >
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItemButton>
                ))}
            </List>
            <Divider/>
            <List>
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
            </List>
        </div>
    )
}

export default DrawerLeft
