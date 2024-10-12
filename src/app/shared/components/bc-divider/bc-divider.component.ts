import {
    Component, ViewEncapsulation, Input,
    HostBinding, booleanAttribute,
} from '@angular/core';

@Component({
    selector: 'bc-divider',
    standalone: true,
    template: '<ng-container></ng-container>',
    styleUrls: [ './bc-divider.component.scss' ],
    host: { class: 'bc-divider' },
    encapsulation: ViewEncapsulation.None,
})
export class BCDividerComponent {

    @Input({ transform: booleanAttribute }) public vertical: boolean;
    @Input() public thickness: string;
    @Input() public color: string;

    @HostBinding('class.bc-divider__vertical')
    get getVertical() { return this.vertical; }

    @HostBinding('class.bc-divider__horizontal')
    get getHorizontal() { return !this.vertical; }

    @HostBinding('style.--thickness')
    get getThickness() { return this.thickness || '1px' }

    @HostBinding('style.--color')
    get getColor() { return this.color || 'var(--bosch-gray-75)' }

}