import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BCStepGroupComponent } from "./bc-step-group/bc-step-group.component";
import { BCStepComponent } from "./bc-step/bc-step.component";
import { BCDividerComponent } from "../bc-divider/bc-divider.component";
import { BCStepHeaderComponent } from "./bc-step-header/bc-step-header.component";

@NgModule({
    imports: [ CommonModule, BCDividerComponent ],
    declarations: [ BCStepGroupComponent, BCStepComponent, BCStepHeaderComponent ],
    exports: [ BCStepGroupComponent, BCStepComponent, BCStepHeaderComponent ],
})
export class BCStepIndicatorModule {}