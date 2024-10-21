import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import _ from 'lodash';

import { IChatItem, IChat, IChatResponse, IPayloadChatComplete } from "../interfaces/chat.interface";

@Injectable({ providedIn: 'root' })
export class ChatService {

    private _endPoint: string = 'chats';

    /**
     * @contructor
     * @param {HttpClient} _httpClient
     */
    constructor( private _httpClient: HttpClient ) {}

    /**
     * @return {Observable}
     */
    public getList(): Observable<IChatItem[]> {
        return this._httpClient.get<IChatItem[]>(`${this._endPoint}`);
    }

    /**
     * @param {IChat} createChat
     * @return {Observable}
     */
    public create( chat: IChat ) {
        return this._httpClient.post<IChat>(`${this._endPoint}/new`, { chat } );
    }

    /**
     * @param {string} id
     * @return {Observable}
     */
    public getById( id: string ): Observable<IChatResponse> {
        return this._httpClient.get<IChatResponse>(`${this._endPoint}/${id}`);
    }

    /**
     * @param {string} id
     * @return {Observable}
     */
    public deleteById( id: string ): Observable<void> {
        return this._httpClient.delete<void>(`${this._endPoint}/${id}`);
    }

    /**
     * @param {string} id
     * @param {IChat} chat
     * @return {Observable}
     */
    public updateById( id: string, chat: IChat ): Observable<IChatResponse> {
        return this._httpClient.post<IChatResponse>(`${this._endPoint}/${id}`, { chat } );
    }

    /**
     * @param {IPayloadChatComplete} payload
     * @return {Observable}
     */
	public completions( payload: IPayloadChatComplete ): Promise<any> {
        const token: string = localStorage.getItem( 'genAIToken' );

        return fetch('http://10.184.95.101:3000/api/chat/completions', {
            signal: payload.signal,
            method: 'POST',
            body: JSON.stringify( _.omit( payload, 'signal' ) ),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        } );
        // 
	}

}