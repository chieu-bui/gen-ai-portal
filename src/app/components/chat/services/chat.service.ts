import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IChatItem, IChat, IChatResponse, IPayloadChatComplete } from "../interfaces/chat.interface";
import { Observable, Observer } from "rxjs";

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
     * @param {IPayloadChatComplete} payload
     * @return {Observable}
     */
	public completions( payload: IPayloadChatComplete ) {
		return this._httpClient.post<any>(`${this._endPoint}/completions`, payload );
	}

}