import {
    EventEmitter, Input, Output,
    Directive, HostBinding, ViewChild,
    HostListener, booleanAttribute,
} from "@angular/core";
import { FormControl } from "@angular/forms";

import { BCTruncateCommon } from "@shared/components/bc-truncate/bc-truncate-common";
import { BCDropdownComponent } from "@shared/components/bc-dropdown/bc-dropdown.component";
import { ITooltipPostion } from "../../bc-tooltip/constant";

export interface IOption {
    value: any;
    label: string;
    disabled?: boolean;
}

@Directive()
export abstract class BCMenuField extends BCTruncateCommon {

    @ViewChild( 'menu' ) public menu: BCDropdownComponent;

    @Input() public position: ITooltipPostion = 'top';
    @Input() public label: string;
    @Input({ transform: booleanAttribute }) public disabled: boolean;
    @Input() public width: string;
    @Input() public height: string;
    @Input() public control: FormControl;

    @Output() public valueChange: EventEmitter<any> = new EventEmitter<any>();

    public isMenuOpen: boolean;
    public dspValue: any;
    public dspLabel: string = '';

    public abstract onEscapeKeydown(): void;

    @HostBinding('style.width')
    get getWidth(): string { return this.width; }

    @HostBinding('style.height')
    get getHeight(): string { return this.height; }

    @HostListener('document:keydown.escape')
    public escapeKeydown() {
        this.onEscapeKeydown();
    }

    /**
     * @param {number} index
     * @param {any} data
     */
    public trackByFunc( index: number, data: any ) {
        return data ? data : index;
    }

    /**
     * @param {any} event
     * @return {void}
     */
    public preventDefault( event: any ) {
        event?.stopPropagation();
        event?.preventDefault();
    }

}