import { Component, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { FormControlErrorMsgPipe } from "@shared/pipes/form-control-error-msg.pipe";
import { DisableControlDirective } from "@shared/directives/disable-control.directive";
import { BCCommonField } from "../bc-common-field.component";
import { BCFormFieldComponent } from "../bc-form-field/bc-form-field.component";
import { CustomDecorators } from "@shared/decorators/custom-decorator";
import { BCTooltipModule } from "@shared/components/bc-tooltip/bc-tooltip.module";

@Component({
    selector: 'bc-number-field',
    standalone: true,
    templateUrl: './bc-number-field.component.html',
    styleUrls: [ '../bc-common-field.component.scss', './bc-number-field.component.scss' ],
    imports: [
        CommonModule, ReactiveFormsModule, BCFormFieldComponent,
        FormControlErrorMsgPipe, DisableControlDirective, BCTooltipModule,
    ],
    host: { class: 'bc-number-field' },
    encapsulation: ViewEncapsulation.None,
})
export class BCNumberFieldComponent extends BCCommonField {

    /**
     * @constructor
     */
    ngOnInit(): void {
        this.control.setValidators([ CustomDecorators.ValidateNumber ]);
    }

}