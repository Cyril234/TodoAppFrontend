import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';

import { useSearchParams } from "react-router-dom";

import AddTodoDialog from "./AddTodoDialog"
import TodoListItem from "./TodoListItem"


type Todo = {
  title: string;
  note: string;
  checked: boolean;
  tags: {
    priority: 'very low' | 'low' | 'medium' | 'high' | 'very high';
    deadline: [string, string];
  };
};

export default function Todos(){
    const [searchParams] = useSearchParams();
    const [checked, setChecked] = React.useState<number[]>([0]);
    const [todoList, setTodoList] = React.useState<
      Array<{
        title: string;
        note: string;
        checked: boolean;
        tags: { priority: string; deadline: [string, string] };
      }>
    >([]);



    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const onClose = (todo: Todo) => {
        setTodoList([...todoList, todo]);
    };

    React.useEffect(() => {
      const returnx = {
        todos: [
          {
            title: 'Abwaschen',
            note: 'Geschirr in die Spülmaschine tun',
            checked: false,
            tags: {
              priority: 'medium',
              deadline: ['2026-01-28', '2026-01-28'] as [string, string],
            },
          },
          {
            title: 'Hausaufgaben',
            note: '',
            checked: true,
            tags: {
              priority: 'very high',
              deadline: ['2026-02-03', '2026-02-03'] as [string, string],
            },
          },
          {
            title: 'Computer bestellen',
            note: 'Online gehen und bestellen',
            checked: false,
            tags: {
              priority: 'low',
              deadline: ['2026-01-28', '2026-02-03'] as [string, string],
            },
          },
          {
            title: 'Müll rausbringen',
            note: 'Restmüll und Papier',
            checked: false,
            tags: {
              priority: 'medium',
              deadline: ['2026-01-28', '2026-01-29'] as [string, string],
            },
          },
          {
            title: 'Einkaufen',
            note: 'Lebensmittel für die Woche',
            checked: false,
            tags: {
              priority: 'high',
              deadline: ['2026-01-30', '2026-01-30'] as [string, string],
            },
          },
          {
            title: 'Zimmer aufräumen',
            note: 'Schreibtisch und Boden',
            checked: false,
            tags: {
              priority: 'very low',
              deadline: ['2026-02-01', '2026-02-01'] as [string, string],
            },
          },
          {
            title: 'Arzttermin vereinbaren',
            note: 'Hausarzt anrufen',
            checked: false,
            tags: {
              priority: 'very high',
              deadline: ['2026-01-31', '2026-01-31'] as [string, string],
            },
          },
          {
            title: 'Backup machen',
            note: 'Wichtige Dateien sichern',
            checked: false,
            tags: {
              priority: 'medium',
              deadline: ['2026-02-02', '2026-02-02'] as [string, string],
            },
          },
        ],
      };

      setTodoList(returnx.todos, );
    }, []);

  return (
      <div>
      <AddTodoDialog onClose={onClose}/>
      <h1>{searchParams.get("tab")}</h1>

    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {todoList.map((value, index) => {
        const key = `${value.title}-${value.tags.deadline[0]}`;
        return (
          <TodoListItem
            key={key}
            todo={value}
            index={index}
            checked={checked}
            onToggle={handleToggle}
          />
        );
      })}
    </List>
    </div>
  );
}
