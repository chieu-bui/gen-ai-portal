import { NgModule } from "@angular/core";
import { BCTooltipComponent } from "./bc-tooltip.component";
import { CommonModule } from "@angular/common";
import { BCTooltipDirective } from "./bc-tooltip.directive";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ BCTooltipComponent, BCTooltipDirective ],
    exports: [ BCTooltipComponent, BCTooltipDirective ],
})
export class BCTooltipModule {}