import {
    booleanAttribute, Component, EventEmitter,
    Input, Output, ViewEncapsulation,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { FormControlErrorMsgPipe } from "@shared/pipes/form-control-error-msg.pipe";
import { DisableControlDirective } from "@shared/directives/disable-control.directive";
import { BCTooltipModule } from "@shared/components/bc-tooltip/bc-tooltip.module";
import { BCCommonField } from "../bc-common-field.component";
import { BCFormFieldComponent } from "../bc-form-field/bc-form-field.component";
import { BCButtonComponent } from "@shared/components/bc-button/bc-button.component";

@Component({
    standalone: true,
    selector: 'bc-text-field',
    templateUrl: './bc-text-field.component.html',
    styleUrls: [ '../bc-common-field.component.scss', './bc-text-field.component.scss' ],
    imports: [
        CommonModule, ReactiveFormsModule, BCFormFieldComponent,
        FormControlErrorMsgPipe, DisableControlDirective, BCTooltipModule,
        BCButtonComponent,
    ],
    host: { class: 'bc-text-field' },
    encapsulation: ViewEncapsulation.None,
})
export class BCTextFieldComponent extends BCCommonField {

    @Input({ transform: booleanAttribute }) public canEdit: boolean;

    @Output() public saveEvent: EventEmitter<void> = new EventEmitter<void>();
    @Output() public cancelEvent: EventEmitter<void> = new EventEmitter<void>();

    /**
     * @return {void}
     */
    public save() {
        this.saveEvent.emit();
    }

    /**
     * @return {void}
     */
    public cancel() {
        this.cancelEvent.emit();
    }
}