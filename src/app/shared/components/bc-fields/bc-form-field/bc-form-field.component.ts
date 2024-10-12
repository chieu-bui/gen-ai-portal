import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    standalone: true,
    selector: 'bc-form-field',
    templateUrl: './bc-form-field.component.html',
    styleUrls: [ './bc-form-field.component.scss' ],
    host: { class: 'bc-form-field' },
    encapsulation: ViewEncapsulation.None,
})
export class BCFormFieldComponent {}