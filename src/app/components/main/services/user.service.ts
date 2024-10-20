import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

export interface IUser {
    id: string;
    email: string;
    name: string;
    role: string;
    profile_image_url: string;
    token?: string;
    token_type?: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {

    private _endPoint: string = 'auths';

    private _user: IUser;
    get user() { return this._user; }
    set user( newuser: IUser ) { this._user = newuser; }

    public user$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>( undefined );

    /**
     * @constructor
     * @param {HttpClient} _httpClient
     */
    constructor( private _httpClient: HttpClient ) {}

    /**
     * @return {Observable}
     */
    public getUser(): Observable<IUser> {
        return this._httpClient.get<IUser>(`${this._endPoint}`);
    }

    /**
     * @param {any} data
     * @return {Observable}
     */
    public login( data: { email: string, password: string } ) {
        return this._httpClient.post<IUser>(`${this._endPoint}/signin`, data );
    }

    /**
     * @param {any} data
     * @return {Observable}
     */
    public signUp( data: { email: string, password: string, name: string, profile_image_url: string } ) {
        return this._httpClient.post<IUser>(`${this._endPoint}/signup`, data );
    }

}