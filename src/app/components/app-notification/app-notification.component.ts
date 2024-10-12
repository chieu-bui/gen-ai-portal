import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { IType, BCNotificationComponent } from "@shared/components/bc-notification/bc-notification.component";
import { NotificationService } from "@shared/services/notification.service";

type IObject<T> = Record<string, T>;

const ICONS: IObject<string> = {
    success: 'ui-ic-alert-success',
    warning: 'ui-ic-alert-warning',
    error: 'ui-ic-alert-error',
};

@Component({
    selector: 'app-notification',
    standalone: true,
    templateUrl: './app-notification.component.html',
    host: { class: 'app-notification' },
    imports: [ CommonModule, BCNotificationComponent ],
})
export class AppNotificationComponent {

    get notification$() { return this._notificationService.notification$ };

    /**
     * @constructor
     * @param {NotificationService} _notificationService
     */
    constructor( private _notificationService: NotificationService ) {}

    /**
     * @param {IType} state
     * @return {void}
     */
    public getIcon( state: IType ) {
        return `a-icon ${ICONS?.[ state ]}`;
    }

    /**
     * @return {void}
     */
    public close() {
        this._notificationService.hidden();
    }

}