import * as React from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountMenu from "./AccountMenu.tsx";
import TodoListMenu from "../todos/TodoListMenu.tsx";
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import AssistantRoundedIcon from '@mui/icons-material/AssistantRounded';

import {useNavigate, useSearchParams} from "react-router-dom";
import AddTodoListDialog from "./AddTodoListDialog.tsx";
import {useEffect} from "react";
import design from '../../../design.json';


type TodoList = {
    name: string;
    _id: string;
};

function DrawerLeft() {
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [todoLists, setTodoLists] = React.useState<TodoList[]>([]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const formatForUrl = (text: string) => {
        return text.replace(" ", "-");
    }

    const handleListItemClick = (
        index: number,
        todolist: TodoList,
    ) => {
        setSelectedIndex(index);
        navigate("/?tab=" + formatForUrl(todolist.name)+"&id=" + todolist._id);
    };

    async function getTodoList() {
        try {
            const res = await fetch("http://localhost:3000/todoLists?userId=" + localStorage.getItem("userId"), {
                method: "Get",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Post fehlgeschlagen");
            }

            const data = await res.json();
            console.log("XXXXXXXXXXXXXXXXXXXXX")
            console.log(data)

            setTodoLists(data.todoLists ?? []);
            console.log(todoLists)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTodoList()
        console.log(todoLists)
    }, []);

    async function addTodoList(name: string) {
        try {
            const res = await fetch("http://localhost:3000/addTodolist", {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    userId: localStorage.getItem("userId"),
                }),
            });

            if (!res.ok) {
                throw new Error("Post fehlgeschlagen");
            }

            const data = await res.json();
            setTodoLists([...todoLists, {name: name, _id: data.id}]);

        } catch (error) {
            console.error(error);
        }
    }

    async function deleteTodoList(deleteWithTodos: boolean) {
        try {
            console.log("XYZ")

            if(searchParams.get("tab") === "tasks"){
                alert("Cannot delete default todo lists");
                return;
            }

            const res = await fetch("http://localhost:3000/todoList", {
                method: "Delete",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    deleteTodos: deleteWithTodos,
                    todoListId: searchParams.get("id"),
                    userId: localStorage.getItem("userId"),
                }),
            });

            if (!res.ok) {
                throw new Error(res.statusText);
            }

            setTodoLists(todoLists.filter((t) => {
                if(t._id === searchParams.get("id")) {
                    return false;
                }
                return true;
            }));

            navigate("/?tab=Today&id=1");

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div style={{backgroundColor: design.backgroundColourGray, height: "100vh"}}>
            <AccountMenu />
            <Divider/>

            <List sx={{bgcolor: design.backgroundColourGray,}}>
                {[{name: 'AI-Assistant', _id: "4", icon: <AssistantRoundedIcon/>},{name: 'Today', _id: "0", icon: <TodayOutlinedIcon/>}, {name: 'This Weak', _id: "1", icon: <DateRangeOutlinedIcon/>}, {name: 'Important', _id: "2", icon: <ReportGmailerrorredOutlinedIcon/>}, {name: 'All', _id: "3", icon: <FilterNoneOutlinedIcon/>}].map((todolist, index) => (
                    <ListItemButton
                        selected={selectedIndex === index}
                        onClick={() => handleListItemClick(index, todolist)}
                        key={todolist._id}
                    >
                        <ListItemIcon>
                            {todolist.icon}
                        </ListItemIcon>
                        <ListItemText primary={todolist.name}/>
                    </ListItemButton>
                ))}

            </List>
            <Divider/>
            <List sx={{bgcolor: design.backgroundColourGray,}}>
                {todoLists.map((todoList, index) => (
                    <ListItemButton
                        selected={selectedIndex === index + 4}
                        onClick={() => handleListItemClick(index + 4, todoList)}
                        key={todoList._id}
                    >
                        <ListItemIcon>
                            <TodoListMenu deleteTodoList={deleteTodoList} />
                        </ListItemIcon>
                        <ListItemText primary={todoList.name}/>
                    </ListItemButton>
                ))}
            </List>
            <AddTodoListDialog position="fixed" style={{ top: 'auto', bottom: 30 }} onClose={addTodoList} />

        </div>
    )
}

export default DrawerLeft
