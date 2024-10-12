import { Component, ViewEncapsulation, Input, HostBinding } from "@angular/core";

export type ISize = 'small' | 'medium' | 'large';

@Component({
    selector: 'bc-loader',
    standalone: true,
    template: '<ng-container></ng-container>',
    styleUrls: [ './bc-loader.component.scss' ],
    host: { class: 'bc-loader' },
    encapsulation: ViewEncapsulation.None,
})
export class BCLoaderComponent {

    @Input() public color: string;
    @Input() public size: ISize = 'small';

    @HostBinding('style.--color')
    get getColor(): string {
        return this.color || 'var(--bosch-blue)';
    }

    @HostBinding('class.bc-loader__small')
    get small(): boolean {
        return this.size === 'small';
    }

    @HostBinding('class.bc-loader__medium')
    get medium(): boolean {
        return this.size === 'medium';
    }

    @HostBinding('class.bc-loader__large')
    get large(): boolean {
        return this.size === 'large';
    }

}