import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { BehaviorSubject, EMPTY, Observable, Observer } from "rxjs";

export interface IBackendConfig {
    status?: boolean;
    version?: string;
    name?: string;
    permissions?: any;
    audio?: any;
    default_locale?: string;
    default_models?: string;
    features?: any;
    file?: any;
    oauth?: any;
}

@Injectable({ providedIn: 'root' })
export class BackendConfigService {

    private _endPoint: string = 'config';

    private _backendConfig: IBackendConfig;
    get backendConfig() { return this._backendConfig; }
    set backendConfig( newBackendConfig: IBackendConfig ) { this._backendConfig = newBackendConfig; }

    public backendConfig$: BehaviorSubject<IBackendConfig> = new BehaviorSubject<IBackendConfig>( undefined );

    /**
     * @constructor
     * @param {HttpClient} _httpClient
     */
    constructor( private _httpClient: HttpClient ) {}

    /**
     * @return {Observable}
     */
    public getBackendConfig(): Observable<any> {
        return this._httpClient.get(`${this._endPoint}`);
    }

}