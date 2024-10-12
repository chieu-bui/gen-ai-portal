import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

import { IType, IBannerType } from "@shared/components/bc-notification/bc-notification.component";

export interface INotification {
    content: string;
    state?: IType;
    bannerState?: IBannerType;
}

const DEFAULT_VALUE: INotification = {
    content: '',
    state: 'success',
    bannerState: 'bottom',
}

@Injectable({ providedIn: 'root' })
export class NotificationService {

    public notification$: BehaviorSubject<INotification> = new BehaviorSubject<INotification>(undefined);

    /**
     * @param {INotification} data
     * @return {void}
     */
    public show( data: INotification ) {
        this.notification$.next({ ...DEFAULT_VALUE, ...data });
    }

    /**
     * @return {void}
     */
    public hidden() {
        this.notification$.next( undefined );
    }

}