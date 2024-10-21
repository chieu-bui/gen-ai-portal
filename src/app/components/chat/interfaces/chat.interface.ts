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
    title?: string;
    models?: string[]; // [ "azure_openai" ]
    params?: IObject<string>;
    history?: IHistory;
    tags?: any[];
    timestamp?: string;
    messages?: any[];
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

export type IRole = 'user' | 'assistant';

export interface IChatMessage {
    role: IRole;
    content: string;
    errorContent?: string;
    id?: string;
}

export interface IPayloadChatComplete {
    stream: boolean;
    model: string,
    stream_options?: IObject<any>;
    messages: IChatMessage[];
    session_id?: string;
    chat_id: string;
    id: string;
    signal: AbortSignal;
}
