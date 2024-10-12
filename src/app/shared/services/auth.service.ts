import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Observer, Subject } from "rxjs";

export interface IUser {
    id: string;
    email: string;
    name: string;
    role: string;
    profile_image_url: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    private _endPoint: string = 'auths';

    private _token: string;
    get token(): string { return this._token; }
    set token( token: string ) { this._token = token; }

    public invalidToken$: Subject<void> = new Subject<void>();

    /**
     * @constructor
     * @param {HttpClient} _httpClient
     */
    constructor( private _httpClient: HttpClient ) {}

    /**
     * @param {string} token
     * @return {Observable}
     */
    public validToken( token: string ): Observable<boolean> {
        return new Observable<boolean>( ( ob: Observer<boolean> ) => ob.next( true ));
        return this._httpClient.post<boolean>('check-valid-token', { token } );
    }

    /**
     * @return {Observable}
     */
    public getToken(): Observable<string> {
        return new Observable<string>( ( ob: Observer<string> ) => {
            ob.next( 'token_test' );
            ob.complete();
        } );
        return this._httpClient.get<string>('get-token');
    }

    /**
     * @return {Observable}
     */
    public getUser(): Observable<IUser> {
        return new Observable<IUser>( ( ob: Observer<IUser> ) => {
            ob.next({
                id: "ba5599c9-a3e8-4c86-b2ac-f3e9624c60a7",
                email: "chieu.buinguyenbao@vn.bosch.com",
                name: "Bui Nguyen Bao Chieu (MS/EET13)",
                role: "admin",
                profile_image_url: "/user.png"
            });
            ob.complete();
        } );
        return this._httpClient.get<IUser>(`${this._endPoint}`);
    }

}