import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import _ from 'lodash';

import { SupergraphicComponent } from '@shared/components/supergraphic/supergraphic.component';
import { AppLoaderComponent } from '@components/app-loader/app-loader.component';
import { AppNotificationComponent } from '@components/app-notification/app-notification.component';
import { SseService } from '@shared/services/sse.service';
import { BackendConfigService } from '@shared/services/backend-config.service';
import { untilCmpDestroyed } from '@shared/decorator';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
	standalone: true,
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrl: './app.component.scss',
  	imports: [ RouterOutlet, SupergraphicComponent, AppLoaderComponent, AppNotificationComponent ],
})
export class AppComponent implements OnInit {

  	/**
   	* @constructor
   	* @param {TranslateService} _translateService
   	*/
	constructor(
		private _translateService: TranslateService,
		private _backendConfigService: BackendConfigService,
		private _httpClient: HttpClient,
		private sseService: SseService
	) {
		this._translateService.use('en');
	}

	/**
	 * @constructor
	 */
	ngOnInit() {
		fetch('http://localhost:3000/stream', {
			method: 'POST',
		})
		.then( (res) => {
			const reader = res.body.getReader();

			reader.read().then( function pump({ done, value }) {
				console.log( new TextDecoder().decode( value ) );
				
				if (done) {
					// Do something with last chunk of data then exit reader
					return;
				  }
			
				  return reader.read().then( pump );

			} )
		})
	}
	
}
