import { NgModule } from "@angular/core";
import { BCTabGroupComponent } from "./bc-tab-group/bc-tab-group.component";
import { BCTabComponent } from "./bc-tab/bc-tab.component";
import { CommonModule } from "@angular/common";
import { BCDividerComponent } from "../bc-divider/bc-divider.component";

@NgModule({
    imports: [ CommonModule, BCDividerComponent ],
    declarations: [ BCTabGroupComponent, BCTabComponent ],
    exports: [ BCTabGroupComponent, BCTabComponent ],
})
export class BCTabsModule {}