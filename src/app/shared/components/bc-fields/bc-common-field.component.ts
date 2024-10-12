import { Directive, Input, booleanAttribute } from "@angular/core";
import { FormControl } from "@angular/forms";

import { BCTruncateCommon } from "../bc-truncate/bc-truncate-common";

@Directive()
export abstract class BCCommonField extends BCTruncateCommon {

    @Input() public label: string;
    @Input() public control: FormControl = new FormControl(undefined);
    @Input() public placeHolder: string = 'Typing...';
    @Input() public width: string;
    @Input() public height: string;
    @Input({ transform: booleanAttribute }) public disabled: boolean;
    @Input({ transform: booleanAttribute }) public notShowError: boolean;

    get isError(): boolean { return this.control?.touched && this.control?.invalid; }

    public searchControl: FormControl<string> = new FormControl('');

}