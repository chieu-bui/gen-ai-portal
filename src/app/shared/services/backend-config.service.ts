import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {map} from 'rxjs/operators';
import { EMPTY, Observable, Observer } from "rxjs";

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
    get backendConfig(): IBackendConfig { return this._backendConfig; }
    set backendConfig( config: IBackendConfig ) { this._backendConfig = config; }

    /**
     * @constructor
     * @param {HttpClient} _httpClient
     */
    constructor( private _httpClient: HttpClient ) {}

    /**
     * @return {Observable}
     */
    public getBackendConfig(): Observable<any> {
        return new Observable<any>( ( ob: Observer<any> ) => {
            ob.next(
                {
                    status: true,
                    name: "GenAI Portal (Open WebUI)",
                    version: "0.3.32",
                    default_locale: "",
                    oauth: {
                        providers: {
                            microsoft: "microsoft"
                        }
                    },
                    features: {
                        auth: true,
                        auth_trusted_header: false,
                        enable_signup: true,
                        enable_login_form: true,
                        enable_web_search: false,
                        enable_image_generation: true,
                        enable_community_sharing: true,
                        enable_message_rating: true,
                        enable_admin_export: true,
                        enable_admin_chat_access: true
                    },
                    default_models: "azure_openai",
                    audio: {
                        tts: {
                            engine: "",
                            voice: "alloy",
                            split_on: "punctuation"
                        },
                        stt: {
                            engine: ""
                        }
                    },
                    file: {
                        max_size: 200,
                        max_count: 5
                    },
                    permissions: {
                        chat: {
                            deletion: true
                        }
                    }
                }
            );
        } ).pipe( map( ( config: IBackendConfig ) => {
            this.backendConfig = config;
            console.log( this.backendConfig );
            
            return EMPTY;
        } ) );
        return this._httpClient.get(`${this._endPoint}`)
        .pipe( map( ( config: IBackendConfig ) => {
            this.backendConfig = config;
            return EMPTY;
        } ) );
    }

}