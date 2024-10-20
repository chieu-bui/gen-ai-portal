import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DropdownTriggerForDirective } from "./bc-dropdown-trigger.directive";
import { BCDropdownComponent } from "./bc-dropdown.component";

@NgModule({
    declarations: [ DropdownTriggerForDirective, BCDropdownComponent ],
    exports: [ DropdownTriggerForDirective, BCDropdownComponent ],
    imports: [ CommonModule ],
  })
  export class BCDropdownModule {}