import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Observer, Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TokenService {

    private _token: string;
    get token() { return this._token; }
    set token( newToken: string ) { this._token = newToken; }

    public token$: BehaviorSubject<string> = new BehaviorSubject<string>( undefined );
    public invalidToken$: Subject<void> = new Subject<void>();

    /**
     * @return {Observable}
     */
    public getToken() {
        return new Observable<string>( ( ob: Observer<string> ) => {
            ob.next( localStorage.getItem( 'genAIToken' ) );
            ob.complete();
        } );
    }

}