import {
    Component, EventEmitter, HostBinding,
    Output, ViewEncapsulation, HostListener,
    Input,
} from "@angular/core";

@Component({
    standalone: true,
    selector: 'bc-checkbox',
    template: '<ng-container></ng-container>',
    styleUrls: [ './bc-checkbox.component.scss' ],
    host: { class: 'bc-checkbox' },
    encapsulation: ViewEncapsulation.None,
})
export class BCCheckboxComponent {

    @Input() public checked: boolean;
    @Input() public disabled: boolean;

    @Output() public checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @HostBinding('class.checked')
    get isChecked(): boolean {
        return !!this.checked;
    }

    @HostBinding('class.disabled')
    get isDisabled(): boolean {
        return !!this.disabled;
    }

    @HostListener('click')
    public onHandleClickEvent() {
    	!this.disabled && this.checkedChange.emit( !this.checked );
    }

}