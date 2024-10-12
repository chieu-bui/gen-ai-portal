import { Component, ViewEncapsulation, Input, HostBinding } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BCTooltipModule } from "../bc-tooltip/bc-tooltip.module";

export type ISize = 'small' | 'medium' | 'large';

@Component({
    selector: 'bc-avatar',
    standalone: true,
    templateUrl: './bc-avatar.component.html',
    styleUrls: [ './bc-avatar.component.scss' ],
    host: { class: 'bc-avatar' },
    imports: [ CommonModule, BCTooltipModule ],
    encapsulation: ViewEncapsulation.None,
})
export class BCAvatarComponent {

    @Input() public size: ISize = 'small';
    @Input() public imgLink: string;
    @Input() public hoverMsg: string;

    @HostBinding('class.bc-avatar__small')
    get small(): boolean {
        return this.size === 'small';
    }

    @HostBinding('class.bc-avatar__medium')
    get medium(): boolean {
        return this.size === 'medium';
    }

    @HostBinding('class.bc-avatar__large')
    get large(): boolean {
        return this.size === 'large';
    }
    
}