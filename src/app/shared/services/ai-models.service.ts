import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";

export interface IModelAI {
    id: string;
    name: string;
    object: string;
    created: number;
    owned_by: string;
    pipe?: any;
    info?: any;
    actions?: any[];
}

export interface IModelAIData {
    data: IModelAI[];
}

@Injectable({ providedIn: 'root' })
export class ModelAIService {

    private _endPoint: string = 'models';


    /**
     * @constructor
     * @param {HttpClient} _httpClient
     */
    constructor( private _httpClient: HttpClient ) {}

    /**
     * @return {Observable}
     */
    public getModelAIList(): Observable<IModelAIData> {
        return new Observable<IModelAIData>( ( ob: Observer<IModelAIData> ) => {
            ob.next({
                data: [
                    {
                        id: "azure_openai",
                        name: "Azure OpenAI",
                        object: "model",
                        created: 1725608811,
                        owned_by: "openai",
                        pipe: {
                          type: "pipe"
                        },
                        info: {
                          id: "azure_openai",
                          user_id: "d457e149-10c1-4056-bf1c-4b0203f5293b",
                          base_model_id: null,
                          name: "Azure OpenAI BGSV",
                          params: {},
                          meta: {
                            profile_image_url: "/static/favicon.png",
                            description: "",
                            capabilities: {
                              "vision": true,
                              "usage": false
                            },
                            suggestion_prompts: null,
                            tags: [],
                            knowledge: [
                              {
                                id: "2dafc11a-eeb1-46f5-9ffe-f52fe5ed02e8",
                                name: "Lesson Learn",
                                description: "Lesson Learn",
                                data: {
                                  file_ids: [
                                    "cba62761-57a1-4809-a94d-9d1f6f1db093"
                                  ]
                                },
                                meta: null,
                                created_at: 1728612448,
                                updated_at: 1728612460,
                                type: "collection"
                              }
                            ]
                          },
                          updated_at: 1728612662,
                          created_at: 1728612662
                        },
                        actions: []
                      }
                ]
            });
            ob.complete();
        } );
        return this._httpClient.get<IModelAIData>(`${this._endPoint}`);
    }

}