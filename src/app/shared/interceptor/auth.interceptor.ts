import { Injectable } from "@angular/core";
import {
    HttpErrorResponse, HttpEvent, HttpHandler,
    HttpInterceptor, HttpRequest,
} from "@angular/common/http";
import { EMPTY, Observable, catchError } from "rxjs";
import _ from 'lodash';

import { environment } from "@environments/environment";
import { TokenService } from "@components/main/services/token.service";

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {

    public readonly URL_NOT_HAVE_VERSION: string[] = [ 'config', 'models' ];

    /**
     * @constructor
     * @param {AuthService} _tokenService
     */
    constructor( private _tokenService: TokenService ) {}

    /**
     * @param {HttpRequest} req
     * @param {HttpHandler} next
     * @return {Observable}
     */
    intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        if ( req.url.includes( 'assets/' ) ) return next.handle(req);

        if ( this._tokenService.token || req.url.includes( 'signin' ) || req.url.includes( 'signup' ) ) {
            const prefix: string = _.includes( this.URL_NOT_HAVE_VERSION, req.url ) ? 'api' : 'api/v1';
            const authReq = req.clone({
                url: `${environment.apiUrl}/${prefix}/${req.url}`,
                setHeaders: {
                    Authorization: `Bearer ${this._tokenService.token}`
                },
            });
    
            return next.handle( authReq )
            .pipe( catchError( ( error: any ) => {
                if ( error?.statusText === 'Expired Password' ) {
                    this._tokenService.token = undefined;
                    localStorage.removeItem( 'genAIToken' );
                    this._tokenService.invalidToken$.next();
                }

                throw new HttpErrorResponse( error );
            } ) );
        }
    }

}