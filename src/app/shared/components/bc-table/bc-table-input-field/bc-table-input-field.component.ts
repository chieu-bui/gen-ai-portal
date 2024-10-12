
import {
    Component, Output, EventEmitter,
    Input, ViewEncapsulation, OnInit,
    ViewChild, ElementRef, booleanAttribute,
} from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { CustomDecorators } from "@shared/decorator/custom-decorator";
import { BCButtonComponent } from "@shared/components/bc-button/bc-button.component";
import { BCDropdownModule } from "@shared/components/bc-dropdown/bc-dropdown.module";
import { IDropdownPanel } from "@shared/components/bc-dropdown/bc-dropdown-trigger.directive";
import { FormControlErrorMsgPipe } from "@shared/pipes/form-control-error-msg.pipe";
import { DisableControlDirective } from "@shared/directives/disable-control.directive";
import { BCTruncateComponent } from "@shared/components/bc-truncate/bc-truncate.component";
import { ICellType } from "../bc-table.interface";
import { CELL_TYPE } from "../constant";

@Component({
    standalone: true,
    selector: "bc-table-input-field",
    templateUrl: "./bc-table-input-field.component.html",
    styleUrls: ["./bc-table-input-field.component.scss"],
    imports: [
        BCDropdownModule, BCButtonComponent, ReactiveFormsModule,
        DisableControlDirective, CommonModule, FormControlErrorMsgPipe,
        BCTruncateComponent,
    ],
    encapsulation: ViewEncapsulation.None,
    host: { class: 'bc-table-input-field' },
})
export class BCTableInputField implements OnInit {

    public readonly CELL_TYPE: typeof CELL_TYPE = CELL_TYPE;
    
    @ViewChild('dropdown') public dropdown: IDropdownPanel;
    @ViewChild('textarea') public textarea: ElementRef;

    @Input({ transform: booleanAttribute }) public editable: boolean;
    @Input({ transform: booleanAttribute }) public error: boolean;
    @Input() public line: number;
    @Input() public type: ICellType = "text";
    @Input() public value: string = '';

    @Output() public valueChange: EventEmitter<string> = new EventEmitter<string>();

    public isClose: boolean;
    public control: FormControl;

    get isError(): boolean { return this.control?.touched && this.control?.invalid; }

    /**
     * @constructor
     */
    ngOnInit(): void {
        switch( this.type ) {
            case CELL_TYPE.NUMBER:
                this.control = new FormControl( '', [ CustomDecorators.ValidateNumber ] );
                break;
            default: 
                this.control = new FormControl('');
                break;
        }
    }

    /**
     * @return {void}
     */
    public menuOpen() {
        this.isClose = false;
        this.control.setValue( this.value );
        this.textarea.nativeElement.focus();
        this.control.markAsTouched();
    }

    /**
     * @return {void}
     */
    public menuClose() {
        this.control.setValue('');
        this.onCancel();
    }

    /**
     * @return {void}
     */
    public onSave() {
        this.valueChange.emit( this.value = this.control.getRawValue() );
        this._onClose();
    }

    /**
     * @return {void}
     */
    public onCancel() {
        this._onClose();
    }

    /**
     * @return {void}
     */
    private _onClose() {
        if ( this.isClose ) return;
        
        this.isClose = true;
        this.dropdown.closed.emit();
    }

}