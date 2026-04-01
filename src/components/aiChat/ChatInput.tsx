import * as React from 'react';
import {InputBase, Paper} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import type {ChatInputProps} from "../shared/types/chat.types.ts";

export default function ChatInput({submitInput}: ChatInputProps) {
    const [input, setInput] = React.useState('');

    function handleSubmit(event?: React.FormEvent<HTMLFormElement>) {
        event?.preventDefault();

        const trimmedInput = input.trim();
        if (!trimmedInput) {
            return;
        }

        submitInput({
            role: 'user',
            content: trimmedInput
        });
        setInput('');
    }

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Stelle irgendeine Frage"
                inputProps={{ 'aria-label': 'search google maps' }}
                value={input}
                onChange={event => setInput(event.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" type="submit">
                <SendRoundedIcon />
            </IconButton>
        </Paper>
    );
}
