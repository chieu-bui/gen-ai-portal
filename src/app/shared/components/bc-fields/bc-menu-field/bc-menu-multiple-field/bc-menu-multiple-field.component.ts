import {
    Component, OnChanges, ViewEncapsulation,
    Input, SimpleChanges,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import _ from 'lodash';

import { BCButtonComponent } from "@shared/components/bc-button/bc-button.component";
import { BCTooltipModule } from "@shared/components/bc-tooltip/bc-tooltip.module";
import { BCCheckboxComponent } from "@shared/components/bc-checkbox/bc-checkbox.component";
import { BCTruncateComponent } from "@shared/components/bc-truncate/bc-truncate.component";
import { BCDropdownModule } from "@shared/components/bc-dropdown/bc-dropdown.module";
import { BCMenuField, IOption } from "../bc-menu-field.common";
import { BCFormFieldComponent } from "../../bc-form-field/bc-form-field.component";
import { BCSearchBoxComponent } from "../../bc-search-box/bc-search-box.component";

export interface IOptionExtra extends IOption {
    checked?: boolean;
}

@Component({
    standalone: true,
    selector: 'bc-menu-multiple-field',
    templateUrl: './bc-menu-multiple-field.component.html',
    styleUrls: [
        '../../bc-common-field.component.scss',
        '../bc-menu-field.common.scss',
    ],
    host: { class: 'bc-menu-field' },
    imports: [
        BCFormFieldComponent, BCDropdownModule, CommonModule,
        BCButtonComponent, FormsModule, BCTooltipModule,
        BCCheckboxComponent, BCTruncateComponent, BCSearchBoxComponent,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class BCMenuMultipleFieldComponent extends BCMenuField implements OnChanges {

    @Input() public options: IOptionExtra[];

    public dspOptions: IOptionExtra[];

    /**
     * @constructor
     * @param {SimpleChanges} changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if ( changes.control || changes.options ) {
            this.dspValue = this.control.value;
            this.options = _.map( this.options, ( op: IOptionExtra ) => {
                return { ...op, checked: _.includes( this.control.value, op.value ) };
            } );

            this.onSearch();
            this._setLabel();
        }
    }

    /**
     * @param {IOptionExtra} option
     * @return {void}
     */
    public onChange( option: IOptionExtra ) {
        if ( !this.dspValue?.length ) this.dspValue = [];

        option.checked = !option.checked;

        option.checked
            ? this.dspValue.push( option.value )
            : _.remove( this.dspValue, ( val: any ) => val === option.value );

        this._setLabel();
        this.control.setValue( this.dspValue );
        this.valueChange.emit( this.dspValue );
        this.checkTooltip();
    }

    /**
     * @param {string=} search
     * @return {void}
     */
    public onSearch( search?: string ) {
        this.dspOptions = search
            ?  _.filter( this.options, ( option: IOption ) =>
                option.label.trim().toLowerCase().includes( search.trim().toLowerCase() ) )
            : this.options;
    }

    /**
     * @return {void}
     */
    private _setLabel() {
        const labels: string[] = [];
        _.forEach( this.options, ( op: IOptionExtra ) => { op.checked && labels.push(op.label); } );
        this.dspLabel = labels.join(', ');
    }

}