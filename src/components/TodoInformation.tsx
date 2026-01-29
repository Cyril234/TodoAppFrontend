import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import TextField from '@mui/material/TextField';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';



type Anchor = 'top' | 'left' | 'bottom' | 'right';

type Todo = {
  title: string;
  note: string;
  checked: boolean;
  tags: {
    priority: 'very low' | 'low' | 'medium' | 'high' | 'very high';
    deadline: [string, string];
  };
};

type TodoInformationProps = {
  todo: Todo;
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export default function TodoInformation({ todo, open, onClose, onOpen }: TodoInformationProps) {
    const [note, setNote] = React.useState(todo.note);

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 700 }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >
     <CloseRoundedIcon onClick={() => {onClose()}}/>
        <h1>{todo.title}</h1>
        <TextField
          style={{ width: "100%" }}
          id="outlined-textarea"
          placeholder="Note"
          multiline
          value={note}
        />
    </Box>
  );

  return (
    <div>
        <React.Fragment key={'right'}>
          <SwipeableDrawer
            anchor={'right'}
            open={open}
            onOpen={onOpen}
          >
            {list('right')}
          </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}
