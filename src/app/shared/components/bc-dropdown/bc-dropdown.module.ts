import { NgModule } from "@angular/core";

import { DropdownTriggerForDirective } from "./bc-dropdown-trigger.directive";
import { BCDropdownComponent } from "./bc-dropdown.component";

@NgModule({
    declarations: [DropdownTriggerForDirective, BCDropdownComponent ],
    exports: [DropdownTriggerForDirective, BCDropdownComponent ],
  })
  export class BCDropdownModule {}