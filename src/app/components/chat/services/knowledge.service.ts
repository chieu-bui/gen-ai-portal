import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface IDataKnowledge {
    file_ids: string[];
}

export interface IKnowledge {
    id: string;
    name: string;
    description: string;
    data: IDataKnowledge;
    meta: any;
}

@Injectable({ providedIn: 'root' })
export class KnowledgeService {
    
    private _endPoint: string = 'knowledge';

    /**
     * @contructor
     * @param {HttpClient} _httpClient
     */
    constructor( private _httpClient: HttpClient ) {}

    /**
     * @return {Observable}
     */
    public getKnowledge(): Observable<IKnowledge[]> {
        return this._httpClient.get<IKnowledge[]>( this._endPoint );
    }

}