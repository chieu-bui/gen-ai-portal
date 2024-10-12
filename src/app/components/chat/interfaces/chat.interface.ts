export interface IChatItem {
    id: string;
    title: string;
    updated_at: number;
    created_at: number;
}

export interface IHistory {
    messages: IObject<string>,
    currentId: string;
}

export interface IChat {
    id?: string;
    title: string;
    models: string[]; // [ "azure_openai" ]
    params: IObject<string>;
    history: IHistory;
    tags: any[];
    timestamp: string;
}

export interface IChatResponse {
    chat: IChat;
    id: string;
    user_id: string;
    title: string;
    updated_at: number;
    created_at: number;
    share_id: string;
    archived: boolean;
}