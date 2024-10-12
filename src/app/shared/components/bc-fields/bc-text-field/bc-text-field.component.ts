import { Component, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { FormControlErrorMsgPipe } from "@shared/pipes/form-control-error-msg.pipe";
import { DisableControlDirective } from "@shared/directives/disable-control.directive";
import { BCTooltipModule } from "@shared/components/bc-tooltip/bc-tooltip.module";
import { BCCommonField } from "../bc-common-field.component";
import { BCFormFieldComponent } from "../bc-form-field/bc-form-field.component";

@Component({
    standalone: true,
    selector: 'bc-text-field',
    templateUrl: './bc-text-field.component.html',
    styleUrls: [ '../bc-common-field.component.scss', './bc-text-field.component.scss' ],
    imports: [
        CommonModule, ReactiveFormsModule, BCFormFieldComponent,
        FormControlErrorMsgPipe, DisableControlDirective, BCTooltipModule,
    ],
    host: { class: 'bc-text-field' },
    encapsulation: ViewEncapsulation.None,
})
export class BCTextFieldComponent extends BCCommonField {}