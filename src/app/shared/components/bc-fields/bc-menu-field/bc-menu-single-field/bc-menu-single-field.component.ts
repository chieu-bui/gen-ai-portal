import {
    Component, OnChanges, ViewEncapsulation,
    Input, SimpleChanges, booleanAttribute,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import _ from 'lodash';

import { BCButtonComponent } from "@shared/components/bc-button/bc-button.component";
import { BCTooltipModule } from "@shared/components/bc-tooltip/bc-tooltip.module";
import { BCDropdownModule } from "@shared/components/bc-dropdown/bc-dropdown.module";
import { BCTruncateComponent } from "@shared/components/bc-truncate/bc-truncate.component";
import { BCMenuField, IOption } from "../bc-menu-field.common";
import { BCFormFieldComponent } from "../../bc-form-field/bc-form-field.component";
import { BCSearchBoxComponent } from "../../bc-search-box/bc-search-box.component";

@Component({
    standalone: true,
    selector: 'bc-menu-single-field',
    templateUrl: './bc-menu-single-field.component.html',
    styleUrls: [ '../../bc-common-field.component.scss', '../bc-menu-field.common.scss' ],
    host: { class: 'bc-menu-field' },
    imports: [
        BCFormFieldComponent, FormsModule, BCTooltipModule,
        BCDropdownModule, CommonModule, BCButtonComponent,
        ReactiveFormsModule, BCSearchBoxComponent, BCTruncateComponent,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class BCMenuSingleFieldComponent extends BCMenuField implements OnChanges {

    private readonly NONE_OPTION: IOption = { value: null, label: 'None' };

    @Input() public options: IOption[];
    @Input({ transform: booleanAttribute }) public addNoneOption: boolean;

    public dspOptions: IOption[];

    /**
     * @constructor
    * @param {SimpleChanges} changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if ( ( changes.options || changes.control ) && changes.options.currentValue ) {
            this.onSearch();
            this.dspValue = this.control.value;
            this.dspLabel = _.find( this.dspOptions, ( op: IOption ) => op.value === this.control.value )?.label || '';
        }
    }

    /**
     * @return {void}
     */
    public override onEscapeKeydown() {
        this.isMenuOpen && this.menu.closed.emit();
    }

    /**
     * @return {void}
     * @param {IOption} option
     */
    public onChange( option: IOption ) {
        if ( option.value === this.control.value ) return;

        const label: string = _.isNull( option.value ) ? '' : option.label;
        const value: string = _.isNull( option.value ) ? '' : option.value;
 
        this.dspLabel = label;
        this.dspValue = value;
        this.control.setValue( value );
        this.valueChange.emit( value );
        this.checkTooltip();
    }

    /**
     * @param {string=} search
     * @return {void}
     */
    public onSearch( search?: string ) {
        const _options: IOption[] = this.addNoneOption
            ? [ this.NONE_OPTION, ...this.options ]
            : [ ...this.options ];

        this.dspOptions = search
            ?  _.filter( _options, ( option: IOption ) =>
                option.label.trim().toLowerCase().includes( search.trim().toLowerCase() ) )
            : _options;
    }

}