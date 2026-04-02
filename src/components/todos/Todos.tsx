import * as React from 'react';
import List from '@mui/material/List';

import {useSearchParams} from "react-router-dom";

import AddTodoDialog from "./AddTodoDialog.tsx"
import TodoListItem from "./TodoListItem.tsx"

import type {Todo, Priority} from "../shared/types/common.types.ts";

export default function Todos() {
    const [searchParams] = useSearchParams();
    const tab = searchParams.get("tab");
    const todoListId = searchParams.get("id");
    const [todoList, setTodoList] = React.useState<Todo[]>([]);

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

    async function updateTodo(todo: Todo, title:string, note: string, priority: Priority, deadline: [string, string]) {

        try {
            todo.title = title;
            todo.note = note;
            todo.tags.priority = priority;
            todo.tags.deadline = deadline;

            console.log(todo)

            const res = await fetch("http://localhost:3000/todo", {
                method: "Put",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    todo
                }),
            });

            if (!res.ok) {
                throw new Error("Get fehlgeschlagen");
            }

            const response = await res.json();
            console.log(response)

            setTodoList(todoList.map((t) => {
                if(t._id === todo._id) {
                    return todo;
                }
                return t;
            }));
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteTodo(todo: Todo) {

        try {
            const res = await fetch("http://localhost:3000/todo", {
                method: "Delete",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    todo
                }),
            });

            if (!res.ok) {
                throw new Error(res.statusText);
            }

            const response = await res.json();
            console.log(response)

            setTodoList(todoList.filter((t) => {
                if(t._id === todo._id) {
                    return false;
                }
                return true;
            }));
        } catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {
        getTodos();
    }, [tab, todoListId]);

    return (
        <div>
            <div>
                <h1>{tab}</h1>
                <AddTodoDialog onClose={onClose}/>
            </div>

            <List sx={{width: '100%'}}>
                {todoList.map((value, index) => {
                    const key = `${value.title}`;
                    return (
                        <TodoListItem
                            key={key}
                            todo={value}
                            index={index}
                            checkTodo={checkTodo}
                            updateTodo={updateTodo}
                            deleteTodo={deleteTodo}
                        />
                    );
                })}
            </List>
        </div>
    );
}
