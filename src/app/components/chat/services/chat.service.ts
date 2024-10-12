import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IChatItem, IChat, IChatResponse } from "../interfaces/chat.interface";
import { Observable, Observer } from "rxjs";

@Injectable()
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
        return new Observable<IChatItem[]>( ( ob: Observer<IChatItem[]> ) => {
            ob.next([
                {
                    id: "c8663ba2-e2a3-4676-8ff5-92d8644efcfa",
                    title: "👨‍🏫 Economic Earnings Term",
                    updated_at: 1728529372,
                    created_at: 1728529366
                },
                {
                    id: "744ec91f-c1fa-42f3-b3d5-6079a6e034dc",
                    title: "📚 Sentence Clarity Check",
                    updated_at: 1728474568,
                    created_at: 1728463385
                },
                {
                    id: "98631bce-2c4c-4ba8-b829-1f1d927c4bec",
                    title: "New Chat",
                    updated_at: 1728461888,
                    created_at: 1728461643
                },
                {
                    id: "ef331618-b85a-430d-8756-f2bf702eb63d",
                    title: "casmen",
                    updated_at: 1728461346,
                    created_at: 1728461050
                },
                {
                    id: "810167f7-ab80-4902-bf9d-4677c2332c48",
                    title: "👋 Friendly Greeting",
                    updated_at: 1728446080,
                    created_at: 1728445936
                },
                {
                    id: "6a5f5f48-b0d9-4fcc-9098-a93f224a1e39",
                    title: "New Chat",
                    updated_at: 1728445857,
                    created_at: 1728445857
                },
                {
                    id: "ca0b5ba7-b3bb-4afd-8b5e-3886f327ce4e",
                    title: "👋 Friendly Greeting",
                    updated_at: 1728444425,
                    created_at: 1728444280
                },
                {
                    id: "0c568169-b1c3-457d-b24e-d944fd10724f",
                    title: "🌐 Angular Web Framework",
                    updated_at: 1728444142,
                    created_at: 1728442900
                },
                {
                    id: "479b0a5f-66e1-4ec1-99cf-20c13aff3ad3",
                    title: "📧 Email Grammar Check",
                    updated_at: 1728383128,
                    created_at: 1728383076
                },
                {
                    id: "696d5bad-964c-4afc-a38c-8e8aca5ee131",
                    title: "🅰️ Angular Web Development Framework",
                    updated_at: 1728382963,
                    created_at: 1728382373
                },
                {
                    id: "ac07732c-84fd-4377-bc2f-298345f19453",
                    title: "⚛️ ReactJS JavaScript Library",
                    updated_at: 1728381556,
                    created_at: 1728381527
                },
                {
                    id: "76ec0d79-524f-4c3a-bd8c-1bcda41fbd21",
                    title: "⚛️ ReactJS Overview",
                    updated_at: 1728381168,
                    created_at: 1728380698
                },
                {
                    id: "52e7abd3-5930-4442-b458-185d14cd3723",
                    title: "📱 Angular Web Framework",
                    updated_at: 1728380411,
                    created_at: 1728380297
                },
                {
                    id: "27aba928-27e3-44da-8482-457ea476ec08",
                    title: "🔧 Angular Web Framework",
                    updated_at: 1728380271,
                    created_at: 1728379852
                },
                {
                    id: "659e8807-27b6-4775-af5f-67e134c44b02",
                    title: "📝 Single Character Query",
                    updated_at: 1728379668,
                    created_at: 1728379102
                },
                {
                    id: "a56886f8-d4e1-4507-a980-772759184bfa",
                    title: "🌐 Angular Framework Overview",
                    updated_at: 1728296106,
                    created_at: 1727938752
                },
                {
                    id: "856bbfe6-05ba-4165-bf7c-36c4d11e974d",
                    title: "👋 Friendly Greeting",
                    updated_at: 1727925532,
                    created_at: 1727925528
                }
            ]);
        } );
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
        return new Observable<IChatResponse>( ( ob: Observer<IChatResponse> ) => {
            const data: any = {
                "id": "5f53422a-1ee9-41bc-8531-f258bc29f1d1",
                "user_id": "ba5599c9-a3e8-4c86-b2ac-f3e9624c60a7",
                "title": "👋 Friendly Greeting",
                "chat": {
                  "id": "",
                  "title": "👋 Friendly Greeting",
                  "models": [
                    "azure_openai"
                  ],
                  "params": {},
                  "history": {
                    "messages": {
                      "522d16eb-f0dc-4c92-8132-0e0959eb0d47": {
                        "id": "522d16eb-f0dc-4c92-8132-0e0959eb0d47",
                        "parentId": null,
                        "childrenIds": [],
                        "role": "user",
                        "content": "hi",
                        "timestamp": 1728551724,
                        "models": [
                          "azure_openai"
                        ],
                        "done": true
                      },
                      "d849ef9f-5627-4a87-8ee3-6b265b9343be": {
                        "id": "d849ef9f-5627-4a87-8ee3-6b265b9343be",
                        "parentId": null,
                        "childrenIds": [
                          "0529f133-feb9-412c-aba3-4e77cec7c7fb"
                        ],
                        "role": "user",
                        "content": "hello\n",
                        "models": [
                          "azure_openai"
                        ]
                      },
                      "0529f133-feb9-412c-aba3-4e77cec7c7fb": {
                        "parentId": "d849ef9f-5627-4a87-8ee3-6b265b9343be",
                        "id": "0529f133-feb9-412c-aba3-4e77cec7c7fb",
                        "childrenIds": [],
                        "role": "assistant",
                        "content": "Hello! How can I assist you today?",
                        "model": "azure_openai",
                        "modelName": "Azure OpenAI",
                        "modelIdx": 0,
                        "userContext": null,
                        "timestamp": 1728631436,
                        "done": true
                      }
                    },
                    "currentId": "0529f133-feb9-412c-aba3-4e77cec7c7fb"
                  },
                  "tags": [],
                  "timestamp": 1728551724885,
                  "messages": [
                    {
                      "id": "d849ef9f-5627-4a87-8ee3-6b265b9343be",
                      "parentId": null,
                      "childrenIds": [
                        "0529f133-feb9-412c-aba3-4e77cec7c7fb"
                      ],
                      "role": "user",
                      "content": "hello\n",
                      "models": [
                        "azure_openai"
                      ]
                    },
                    {
                      "parentId": "d849ef9f-5627-4a87-8ee3-6b265b9343be",
                      "id": "0529f133-feb9-412c-aba3-4e77cec7c7fb",
                      "childrenIds": [],
                      "role": "assistant",
                      "content": "Hello! How can I assist you today?",
                      "model": "azure_openai",
                      "modelName": "Azure OpenAI",
                      "modelIdx": 0,
                      "userContext": null,
                      "timestamp": 1728631436,
                      "done": true
                    }
                  ],
                  "files": []
                },
                "updated_at": 1728631439,
                "created_at": 1728552669,
                "share_id": null,
                "archived": false
              };
            ob.next( JSON.parse( JSON.stringify( data ) ) );
            ob.complete();
        } );
        return this._httpClient.get<IChatResponse>(`${this._endPoint}/${id}`);
    }
}