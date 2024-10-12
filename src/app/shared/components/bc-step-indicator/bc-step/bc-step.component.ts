import { Component, ContentChild, ViewEncapsulation } from "@angular/core";

import { BCStepHeaderComponent } from "../bc-step-header/bc-step-header.component";

@Component({
    selector: 'bc-step',
    template: "<ng-container></ng-container>",
    styleUrls: [ './bc-step.component.scss' ],
    host: { class: 'bc-step' },
    encapsulation: ViewEncapsulation.None,
})
export class BCStepComponent {

    @ContentChild( BCStepHeaderComponent ) public stepHeader: BCStepHeaderComponent;

}