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
        return this._httpClient.get<IModelAIData>(`${this._endPoint}`);
    }

}