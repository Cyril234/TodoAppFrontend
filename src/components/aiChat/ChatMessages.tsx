import Box from "@mui/material/Box";
import {Card} from "@mui/material";
import Typography from "@mui/material/Typography";
import type {ChatMessageType} from "../shared/types/chat.types.ts";

type ChatMessagesProps = {
    submitInput: ChatMessageType[];
};

export default function ChatInput({submitInput}: ChatMessagesProps) {
    console.log("*****************************")
    console.log(submitInput)

    function messageD(message:ChatMessageType) {
        console.log(message)
        if(message.role === "user") {
            return(
                <Card sx={{ minWidth: 275, marginBottom: 1}} >
                    <Typography sx={{ mb: 1.5 }}>{message.content}</Typography>
                </Card>
            )
        }else if(message.role === "assistant") {
            return(
                <Card sx={{ minWidth: 275, backgroundColor: "#e0e0e0", marginBottom: 1}}>
                    <Typography sx={{ mb: 1.5 }}>{message.content}</Typography>
                </Card>
            )
        }

        return(<></>)
    }

    return (
        <Box sx={{overflow: 'auto'}}>
            {
                submitInput.map((message:ChatMessageType) => (
                    messageD(message)
                ))
            }
        </Box>
    );
}
