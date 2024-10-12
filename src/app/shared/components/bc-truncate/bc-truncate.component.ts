import { Component, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ITooltipPostion } from '../bc-tooltip/constant';
import { BCTooltipModule } from '../bc-tooltip/bc-tooltip.module';
import { BCTruncateCommon } from './bc-truncate-common';

@Component({
    selector: 'bc-truncate, [bcTruncate]',
    standalone: true,
    templateUrl: './bc-truncate.component.html',
    styleUrls: [ './bc-truncate.component.scss' ],
    host: { class: 'bc-truncate' },
    imports: [ CommonModule, BCTooltipModule ],
    encapsulation: ViewEncapsulation.None,
})
export class BCTruncateComponent extends BCTruncateCommon {

    @Input() public position: ITooltipPostion = 'top';
    @Input() public maxWidth: string;

    get content(): string { return this.nativeElement?.innerText; }

}