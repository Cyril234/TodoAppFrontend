export type ChatInputProps = {
    submitInput: (input: ChatMessageType) => void;
};

export type ChatMessageType = {
    role:string;
    content:string;
};