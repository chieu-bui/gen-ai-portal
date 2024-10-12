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
		// private sseService: SseService
	) {
		this._translateService.use('en');
	}

	/**
	 * @constructor
	 */
	ngOnInit(): void {
		//aaa
		// this._backendConfigService.getBackendConfig()
		// .pipe( untilCmpDestroyed( this ) )
		// .subscribe();
	}

	// onClick() {
	// 	this.sseService.getServerSentEvent('http://localhost:3000/stream')
	// 	  .subscribe(ev => {
	// 		console.log(ev);
	// 	  },
	// 	  (error) => {
	// 		console.log(error);
	// 	  },
	// 	  () => {
	// 		console.log('==> complete');
	// 	  });
	// }
	
}
