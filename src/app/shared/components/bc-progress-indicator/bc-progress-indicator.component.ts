import { Component, ViewEncapsulation, HostBinding, Input } from "@angular/core";

@Component({
    standalone: true,
    selector: 'bc-progress-indicator',
    templateUrl: './bc-progress-indicator.component.html',
    styleUrls: [ './bc-progress-indicator.component.scss' ],
    host: { class: 'bc-progress-indicator' },
    encapsulation: ViewEncapsulation.None,
})
export class BCProgressIndicatorComponent {

    @Input() public height: string = '10px';
    @Input() public max: number;
    @Input() public value: number;

    @HostBinding('style.height')
    get getHeight() { return this.height; }

    @HostBinding('style.--percent-value')
    get getPercentValue(): string {
        return `${this.value * 100 / this.max}%`;
    };

}