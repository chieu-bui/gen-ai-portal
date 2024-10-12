import { Injectable } from "@angular/core";
import {
    HttpErrorResponse, HttpEvent, HttpHandler,
    HttpInterceptor, HttpRequest,
} from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import _ from 'lodash';

import { environment } from "@environments/environment";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {

    public readonly URL_NOT_HAVE_VERSION: string[] = [ 'config', 'models' ];

    /**
     * @constructor
     * @param {AuthService} _authService
     */
    constructor( private _authService: AuthService ) {}

    /**
     * @param {HttpRequest} req
     * @param {HttpHandler} next
     * @return {Observable}
     */
    intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        if ( req.url.includes( 'assets/' ) || req.url.includes( 'log-in' ) || req.url.includes( 'check-valid-token' ) ) return next.handle(req);

        this._authService.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJhNTU5OWM5LWEzZTgtNGM4Ni1iMmFjLWYzZTk2MjRjNjBhNyJ9.uzBho4n6aDu83l120iJCm2K54KqlnidjPLKAD0CbGj8';

        if ( this._authService.token ) {
            const prefix: string = _.includes( this.URL_NOT_HAVE_VERSION, req.url ) ? 'api' : 'api/v1';
            const authReq = req.clone({
                url: `${environment.apiUrl}/${prefix}/${req.url}`,
                setHeaders: {
                    Authorization: `Bearer ${this._authService.token}`
                },
            });
    
            return next.handle( authReq )
            .pipe( catchError( ( error: any ) => {
                if ( error?.statusText === 'Expired Password' ) {
                    this._authService.token = undefined;
                    this._authService.invalidToken$.next();
                }

                throw new HttpErrorResponse( error );
            } ) );
        }
    }

}