import * as React from 'react';
import List from '@mui/material/List';

import {useSearchParams} from "react-router-dom";

import AddTodoDialog from "./AddTodoDialog"
import TodoListItem from "./TodoListItem"


type Todo = {
    _id: string;
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
    const [todoList, setTodoList] = React.useState<
        Array<{
            title: string;
            note: string;
            checked: boolean;
            tags: { priority: string; deadline: [string, string] };
        }>
    >([]);

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

    async function checkTodo(_id: string) {

        let updatedTodoList = [...todoList];

        for (let i = 0; i < updatedTodoList.length; i++) {
            const t = updatedTodoList[i];

            if (t._id === _id) {
                updatedTodoList[i] = { ...t, checked: !t.checked };
                break;
            }
        }

        setTodoList(updatedTodoList);

        try {
            const res = await fetch("http://localhost:3000/checkTodo", {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    todoId: _id
                }),
            });

            if (!res.ok) {
                throw new Error("Post fehlgeschlagen");
            }

        } catch (error) {
            console.error(error);
        }
    }

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

    const onClose = (todo: Todo) => {
        setTodoList([...todoList, todo]);
        addTodo(todo);
    };

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
                            checkTodo={checkTodo}
                        />
                    );
                })}
            </List>
        </div>
    );
}
