import { Component, Input, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { FormControlErrorMsgPipe } from "@shared/pipes/form-control-error-msg.pipe";
import { DisableControlDirective } from "@shared/directives/disable-control.directive";
import { BCCommonField } from "../bc-common-field.component";
import { BCFormFieldComponent } from "../bc-form-field/bc-form-field.component";

@Component({
    selector: 'bc-textarea-field',
    standalone: true,
    templateUrl: './bc-textarea-field.component.html',
    styleUrls: [
        '../bc-common-field.component.scss',
        './bc-textarea-field.component.scss'
    ],
    imports: [
        CommonModule, ReactiveFormsModule, BCFormFieldComponent,
        FormControlErrorMsgPipe, DisableControlDirective
    ],
    host: { class: 'bc-textarea-field' },
    encapsulation: ViewEncapsulation.None,
})
export class BCTextAreaFieldComponent extends BCCommonField {

    @Input() public rowsLength: number = 5;

}