import { Component, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { FormControlErrorMsgPipe } from "@shared/pipes/form-control-error-msg.pipe";
import { DisableControlDirective } from "@shared/directives/disable-control.directive";
import { BCButtonComponent } from "@shared/components/bc-button/bc-button.component";
import { BCFormFieldComponent } from "../bc-form-field/bc-form-field.component";
import { BCCommonField } from "../bc-common-field.component";
import { BCTooltipModule } from "@shared/components/bc-tooltip/bc-tooltip.module";

@Component({
    selector: 'bc-password-field',
    standalone: true,
    templateUrl: './bc-password-field.component.html',
    styleUrls: [
        '../bc-common-field.component.scss',
        './bc-password-field.component.scss',
    ],
    host: { class: 'bc-password-field' },
    imports: [
        CommonModule, ReactiveFormsModule, BCFormFieldComponent,
        FormControlErrorMsgPipe, DisableControlDirective, BCButtonComponent,
        BCTooltipModule,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class BCPasswordFieldComponent extends BCCommonField {

    public type: string = 'password';
    public icon: string = 'ui-ic-watch-on';

    /**
     * @return {void}
     */
    public onClickIcon() {
        this.type = this.type === 'text' ? 'password' : 'text';
        this.icon = this.icon === 'ui-ic-watch-off' ? 'ui-ic-watch-on' : 'ui-ic-watch-off';
    }

}