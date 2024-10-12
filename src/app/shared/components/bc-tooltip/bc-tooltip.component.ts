import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'bc-tooltip',
    templateUrl: './bc-tooltip.component.html',
    styleUrls: [ './bc-tooltip.component.scss' ],
    host: { class: 'bc-tooltip' },
    encapsulation: ViewEncapsulation.None,
})
export class BCTooltipComponent {

    @Input() public tooltip: any;
    @Input() public width: string;
    @Input() public maxWidth: string;
    @Input() public padding: string;

    public isOnTooltip: boolean;

    @HostBinding('style.width')
    get setWidth(): string {
        return this.width;
    }

    @HostBinding('style.maxWidth')
    get seMaxwidth(): string {
        return this.maxWidth;
    }

    @HostBinding('style.padding')
    get setPadding(): string {
        return this.padding;
    }

    public get isStringTooltip(): boolean {
        return typeof this.tooltip === 'string';
    }

}