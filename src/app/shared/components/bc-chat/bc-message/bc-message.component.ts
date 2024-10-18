import {
    Component, Input,
    ViewEncapsulation, booleanAttribute,
} from "@angular/core";
import { CommonModule } from "@angular/common";

import { SafeHtmlPipe } from "@shared/pipes/safeHtml.pipe";
import { BCTruncateComponent } from "@shared/components/bc-truncate/bc-truncate.component";
import { BCDividerComponent } from "@shared/components/bc-divider/bc-divider.component";
import { BCAvatarComponent } from "@shared/components/bc-avatar/bc-avatar.component";
import { BCMarkDownComponent } from "@shared/components/bc-markdown/bc-markdown.component";

export type IFlexType = 'start' | 'end';

@Component({
    standalone: true,
    selector: 'bc-message',
    templateUrl: './bc-message.component.html',
    styleUrls: [ './bc-message.component.scss' ],
    host: { class: 'bc-message' },
    encapsulation: ViewEncapsulation.None,
    imports: [
        CommonModule, SafeHtmlPipe, BCTruncateComponent,
        BCDividerComponent, BCAvatarComponent, BCMarkDownComponent,
    ],
})
export class BCMessageComponent {

    @Input() public content: string;
    @Input() public errorContent: string;
    @Input({ transform: booleanAttribute }) public isAIResponse: boolean;

}