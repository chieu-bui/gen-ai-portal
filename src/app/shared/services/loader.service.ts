import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {

    public loader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( false );

    /**
     * @return {void}
     */
    public show() {
        this.loader$.next( true );
    }

    /**
     * @return {void}
     */
    public hidden() {
        this.loader$.next( false );
    }

}