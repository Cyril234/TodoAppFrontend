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

import TodoInformation from "./TodoInformation"

type Todo = {
  title: string;
  note: string;
  checked: boolean;
  tags: {
    priority: 'very low' | 'low' | 'medium' | 'high' | 'very high';
    deadline: [string, string];
  };
};

type TodoListItemProps = {
  todo: Todo;
  index: number;
  checked: number[];
  onToggle: (value: number) => () => void;
};

function TodoListItem({ todo, index, checked, onToggle }: TodoListItemProps) {
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
        return <KeyboardDoubleArrowUpRoundedIcon />;
      case 'high':
        return <KeyboardArrowUpRoundedIcon />;
      case 'medium':
        return <HorizontalRuleRoundedIcon />;
      case 'low':
        return <KeyboardArrowDownRoundedIcon />;
      case 'very low':
        return <KeyboardDoubleArrowDownRoundedIcon />;
    }
  };

  const renderDeadlineIcon = (deadline: [string, string]) => {
    if(!deadline) {
      return null;
    }
    if (deadline[0] === deadline[1]) {
      return (
        <div>
          <CalendarMonthIcon />
          {deadline[0]}
        </div>
      );
    } else {
      return (
        <div>
          <CalendarMonthIcon />
          {deadline[0]} - {deadline[1]}
        </div>
      );
    }
  };

  const labelId = `todo-checkbox-${index}`;
//onClick={() => setInfoOpen(false)}
  return (
    <ListItem disablePadding>
      <ListItemButton role={undefined} dense onClick={handleOpenInfo}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked.includes(index)}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
            onClick={(event) => event.stopPropagation()}
            onChange={onToggle(index)}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={todo.title} />
        <div edge="end">
            {renderPriorityIcon(todo.tags.priority)}
            {renderDeadlineIcon(todo.tags.deadline)}
        </div>
      </ListItemButton>
      <TodoInformation
        todo={todo}
        open={infoOpen}
        onClose={handleCloseInfo}
        onOpen={handleOpenInfo}
      />
    </ListItem>
  );
}

export default TodoListItem;
