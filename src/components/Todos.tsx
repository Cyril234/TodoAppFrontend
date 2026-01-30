import * as React from 'react';
import List from '@mui/material/List';

import {useSearchParams} from "react-router-dom";

import AddTodoDialog from "./AddTodoDialog"
import TodoListItem from "./TodoListItem"


type Todo = {
    userId?: string;
    todoListId?: string;
    title: string;
    note: string;
    checked: boolean;
    tags: {
        priority: 'very low' | 'low' | 'medium' | 'high' | 'very high';
        deadline: [string, string];
    };
};

export default function Todos() {
    const [searchParams] = useSearchParams();
    const tab = searchParams.get("tab");
    const todoListId = searchParams.get("id");
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

    async function addTodo(todo: Todo) {
        try {
            console.log(JSON.stringify(todo))
            const res = await fetch("http://localhost:3000/addTodo", {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(todo),
            });

            if (!res.ok) {
                throw new Error("Post fehlgeschlagen");
            }

        } catch (error) {
            console.error(error);
        }
    }

    const onClose = (todo: Todo) => {
        setTodoList([...todoList, todo]);
        addTodo(todo);
    };

    async function getTodos() {

        try {
            const res = await fetch("http://localhost:3000/todos?userId=" + localStorage.getItem("userId") + "&todoListId=" + todoListId, {
                method: "Get",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Get fehlgeschlagen");
            }

            const response = await res.json();

            setTodoList(response.todos);
        } catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {
        getTodos();
    }, [tab, todoListId]);

    return (
        <div>
            <AddTodoDialog onClose={onClose}/>
            <h1>{tab}</h1>

            <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                {todoList.map((value, index) => {
                    const key = `${value.title}`;
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
