import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import _ from 'lodash';

import { Unsubscriber, untilCmpDestroyed } from '@shared/decorator';
import { CONSTANTS } from '@shared/router-constants';
import { AppLoaderComponent } from '@components/app-loader/app-loader.component';
import { AppNotificationComponent } from '@components/app-notification/app-notification.component';
import { BackendConfigService, IBackendConfig } from '@components/main/services/backend-config.service';
import { TokenService } from '@components/main/services/token.service';
import { IUser, UserService } from '@components/main/services/user.service';

@Unsubscriber()
@Component({
	standalone: true,
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrl: './app.component.scss',
  	imports: [ RouterOutlet, AppLoaderComponent, AppNotificationComponent ],
})
export class AppComponent implements OnInit {

	/**
   	* @constructor
   	* @param {TranslateService} _translateService
   	*/
	   constructor(
		private _translateService: TranslateService,
		private _backendConfigService: BackendConfigService,
		private _tokenService: TokenService,
		private _userService: UserService,
		private _router: Router,
	) {
		this._translateService.use('en');
	}

	/**
	 * @constructor
	 */
	ngOnInit() {
		this._initSubject();

		this._tokenService.token = localStorage.getItem( 'genAIToken' );

		if ( !this._tokenService.token ) {
			this._router.navigate([ CONSTANTS.LOGIN.route ]);
			return;
		}

		forkJoin([ this._backendConfigService.getBackendConfig(), this._userService.getUser() ])
		.pipe( untilCmpDestroyed( this ) )
		.subscribe( ( [ backendConfig, user ]: [ IBackendConfig, IUser ] ) => {
			this._backendConfigService.backendConfig$.next( backendConfig );
			this._userService.user$.next( user );
		} );
	}

	/**
	 * @return {void}
	 */
	private _initSubject() {
		this._userService.user$
		.pipe( untilCmpDestroyed( this ) )
		.subscribe( ( user: IUser ) => this._userService.user = user );

		this._tokenService.token$
		.pipe( untilCmpDestroyed( this ) )
		.subscribe( ( token: string ) => this._tokenService.token = token );

		this._tokenService.invalidToken$
		.pipe( untilCmpDestroyed( this ) )
		.subscribe( () => {
			this._tokenService.token = undefined;
			this._router.navigate([ CONSTANTS.LOGIN.route ]);
		} );

		this._backendConfigService.backendConfig$
		.pipe( untilCmpDestroyed( this ) )
		.subscribe( ( backendConfig: IBackendConfig ) => this._backendConfigService.backendConfig = backendConfig );
	}
	
}
