import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { BCActivityIndicatorComponent } from "@shared/components/bc-activity-indicator/bc-activity-indicator.component";
import { LoaderService } from "@shared/services/loader.service";

@Component({
    selector: 'app-loader',
    standalone: true,
    templateUrl: './app-loader.component.html',
    styleUrls: [ './app-loader.component.scss' ],
    host: { class: 'app-loader' },
    imports: [ CommonModule, BCActivityIndicatorComponent ],
})
export class AppLoaderComponent {

    get loader$() { return this._loaderService.loader$ };

    /**
     * @constructor
     * @param {LoaderService} _loaderService
     */
    constructor( private _loaderService: LoaderService ) {}

}