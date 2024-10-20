import {
    Component, Output, TemplateRef,
    ViewChild, EventEmitter, Input,
    booleanAttribute, ContentChild,
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
    @ContentChild('contentTemplate') contentTemplate: TemplateRef<any>;

    @Input() public width: string;
    @Input() public minWidth: string;
    @Input() public maxWidth: string;
    @Input() public maxHeight: string;
    @Input({ transform: booleanAttribute }) public disableClose: boolean;

    @Output() public closed = new EventEmitter<void>();

}