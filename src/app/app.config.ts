import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

import { routes } from './app.routes';
import { interceptorProviders } from '@shared/interceptor';
import { AuthService } from '@shared/services/auth.service';
import { BackendConfigService } from '@shared/services/backend-config.service';

function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

/**
 * @param {AuthService} authService
 * @return {Promise} 
 */
function initToken( authService: AuthService, backendConfigService: BackendConfigService ) {
	return (): Promise<any> =>
		firstValueFrom( authService.getToken() )
		.then( ( token: string ) => {

			if ( !token ) return;
			
			firstValueFrom ( authService.validToken( token ) )
			.then( ( isValid: boolean ) => {        
        if ( isValid ) {
          authService.token = token;
          backendConfigService.getBackendConfig().subscribe();
        } } )
			.catch( ( err: any ) => console.log( 'Error on check valid Token', err ) );
		} )
		.catch( ( err: any ) => console.log( 'Error on get Token', err ) );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      BrowserModule,
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      }),
    ),
    interceptorProviders,
    {
			provide: APP_INITIALIZER,
			useFactory: initToken,
			deps: [ AuthService, BackendConfigService ],
			multi: true,
		},
    provideAnimationsAsync(),
  ]
};
