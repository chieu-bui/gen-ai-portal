import { NgModule } from "@angular/core";
import { BCRadioGroupComponent } from "./bc-radio-group/bc-radio-group.component";
import { BCRadioComponent } from "./bc-radio/bc-radio.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [ CommonModule, FormsModule ],
    declarations: [ BCRadioGroupComponent, BCRadioComponent ],
    exports: [ BCRadioGroupComponent, BCRadioComponent ],
})
export class BCRadioModule {}