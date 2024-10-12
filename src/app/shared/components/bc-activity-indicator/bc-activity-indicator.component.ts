import { Component, ViewEncapsulation, Input, HostBinding } from '@angular/core';

export type IIndicatorSize = 'small' | 'medium' | 'large';

@Component({
    selector: 'bc-activity-indicator',
    standalone: true,
    templateUrl: './bc-activity-indicator.component.html',
    styleUrls: [ './bc-activity-indicator.component.scss' ],
    host: { class: 'bc-activity-indicator' },
    encapsulation: ViewEncapsulation.None,
})
export class BCActivityIndicatorComponent {

    @Input() public size: IIndicatorSize = 'small';

    @HostBinding('class.bc-activity-indicator__small')
    get small(): boolean {
        return this.size === 'small';
    }

    @HostBinding('class.bc-activity-indicator__medium')
    get medium(): boolean {
        return this.size === 'medium';
    }

    @HostBinding('class.bc-activity-indicator__large')
    get large(): boolean {
        return this.size === 'large';
    }

}