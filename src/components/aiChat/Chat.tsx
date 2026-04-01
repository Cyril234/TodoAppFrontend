import * as React from 'react';
import Box from "@mui/material/Box";
import ChatInput from "./ChatInput.tsx";
import ChatMessage from "./ChatMessages.tsx";
import {useEffect} from "react";

type chatMessage = {
    role:string;
    content:string;
};

export default function Chat() {
    //let chat:chatMessage[] = [{ "role": "system", "content": "answer in english." }];
    const [chat, setChat] = React.useState<chatMessage[]>([]);


    function submitInput(messange: chatMessage) {
        const nextChat = [...chat, messange];
        setChat(nextChat);
        askChat(nextChat)
    }

    async function askChat(currentChat: chatMessage[]) {

        try {
            console.log("++++++++++++++++++++++++++++++++++++++++++")
            console.log(currentChat)
            const res = await fetch("http://localhost:11435/api/chat", {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                        "model": "llama3.2:1b",
                        "stream": false,
                        "messages": currentChat,
                    }),
            });

            if (!res.ok) {
                throw new Error("Get fehlgeschlagen");
            }

            const response = await res.json();
            setChat([...currentChat, response.message]);
        } catch (error) {
            console.error(error);
        }
    }

    async function getTodos() {

        try {
            const res = await fetch("http://localhost:3000/todos?userId=" + localStorage.getItem("userId") + "&todoListId=3", {
                method: "Get",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Get fehlgeschlagen");
            }

            const response = await res.json();

            setChat([{ "role": "system", "content": "You are a personal assistant tasked with managing Todos. This are the TODOS:" + JSON.stringify(response) }]);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTodos()
    }, []);


    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap'}} height={"100%"}>
            <h1>AI-Assistant</h1>
            <Box width={"100%"} height={"80%"} overflow={"auto"}>
                <ChatMessage submitInput={chat}/>
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "center"}} width={"100%"}/*position={"fixed"} bottom={60} left={400} */ >
                <ChatInput submitInput={submitInput}/>
            </Box>
        </Box>
    );
}
