import {
    Component, ViewEncapsulation, Input,
    HostBinding, Output, EventEmitter,
    HostListener, booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { BCTooltipModule } from '../bc-tooltip/bc-tooltip.module';
import { ITooltipPostion } from '../bc-tooltip/constant';
import { BCLoaderComponent } from '../bc-loader/bc-loader.component';

export type IType = 'primary' | 'secondary' | 'tertiary' | 'integrated';

@Component({
    selector: 'bc-button',
    standalone: true,
    templateUrl: './bc-button.component.html',
    styleUrls: [ './bc-button.component.scss' ],
    host: { class: 'bc-button' },
    imports: [ CommonModule, BCTooltipModule, BCLoaderComponent ],
    encapsulation: ViewEncapsulation.None,
})
export class BCButtonComponent {
    
    private _icon: string;

    @Input()
    get icon(): string { return this._icon; };
    set icon( _icon: string ) { this._icon = _icon ? `a-icon ${_icon}` : ''; }

    @Input({ transform: booleanAttribute }) public disabled: boolean;
    @Input({ transform: booleanAttribute }) public loading: boolean;
    @Input() public content: string;
    @Input() public width: string = 'fit-content';
    @Input() public maxWidth: string = '100%';
    @Input() public classCustom: string;
    @Input() public styleCustom: string;
    @Input() public tooltipMsg: string;
    @Input() public type: IType = 'primary';
    @Input() public tooltipPosition: ITooltipPostion = 'top';

    @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

    get isDisabled(): boolean {
        return this.disabled || this.loading;
    }

    @HostBinding('style.width')
    get getWidth(): string {
        return this.width;
    }

    @HostBinding('style.maxWidth')
    get getMaxWidth(): string {
        return this.maxWidth;
    }

    @HostBinding('class.disabled__primary')
    get isDisabledPrimary(): boolean {
        return this.isDisabled && this.type === 'primary';
    }

    @HostBinding('class.disabled__secondary')
    get isDisabledSecondary(): boolean {
        return this.isDisabled && this.type === 'secondary';
    }

    @HostBinding('class.disabled__tertiary')
    get isDisabledTertiary(): boolean {
        return this.isDisabled && this.type === 'tertiary';
    }

    @HostBinding('class.disabled__integrated')
    get isDisabledIntegrated(): boolean {
        return this.isDisabled && this.type === 'integrated';
    }
    
    @HostBinding('class.primary')
    get isPrimary(): boolean {
        return !this.isDisabled && this.type === 'primary';
    }

    @HostBinding('class.secondary')
    get isSecondary(): boolean {
        return !this.isDisabled && this.type === 'secondary';
    }

    @HostBinding('class.tertiary')
    get isTertiary(): boolean {
        return !this.isDisabled && this.type === 'tertiary';
    }

    @HostBinding('class.integrated')
    get isIntegrated(): boolean {
        return !this.isDisabled && this.type === 'integrated';
    }

    @HostListener('click')
    public onHandleClickEvent() {
    	!this.isDisabled && this.onClick.emit();
    }

} 