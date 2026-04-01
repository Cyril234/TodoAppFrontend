export type Todo = {
    _id: string;
    userId?: string;
    todoListId?: string;
    title: string;
    note: string;
    checked: boolean;
    tags: {
        priority: Priority;
        deadline: [string, string];
    };
};

export type Priority = 'very low' | 'low' | 'medium' | 'high' | 'very high';
