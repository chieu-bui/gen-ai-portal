import {
    Component, Output, TemplateRef,
    ViewChild, EventEmitter, Input,
    booleanAttribute,
} from "@angular/core";

import { IDropdownPanel } from "./bc-dropdown-trigger.directive";

@Component({
    selector: "bc-dropdown",
    templateUrl: "./bc-dropdown.component.html",
    styleUrls: ["./bc-dropdown.component.scss"],
    host: { class: 'bc-dropdown' },
})
export class BCDropdownComponent implements IDropdownPanel {
    
    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

    @Input() width: string;
    @Input() minWidth: string;
    @Input() maxWidth: string;
    @Input() maxHeight: string;
    @Input({ transform: booleanAttribute }) disableClose: boolean;

    @Output() closed = new EventEmitter<void>();

}