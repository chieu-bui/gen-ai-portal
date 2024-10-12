import {
    Component, EventEmitter, HostBinding,
    Input, OnChanges, Output,
    SimpleChanges, TemplateRef, ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import _ from 'lodash';

import {
    ITableHeader, ITableRow, ITableGroupHeader,
    IConfigTable, ITableCell, IUpdateRow,
} from './bc-table.interface';
import { CELL_TYPE } from './constant';
import { StickyTableDirectiveModule } from './sticky-table/sticky-table.module';
import { BCTextFieldComponent } from '../bc-fields/bc-text-field/bc-text-field.component';
import { BCDropdownModule } from '../bc-dropdown/bc-dropdown.module';
import { BCTableInputField } from './bc-table-input-field/bc-table-input-field.component';
import { BCButtonComponent } from '../bc-button/bc-button.component';
import { BCRadioModule } from '../bc-radio/bc-radio.module';
import { IRadioGroupChange } from '../bc-radio/bc-radio-group/bc-radio-group.component';

interface ITableRowExtra extends ITableRow {
    isEdit?: boolean;
    error?: boolean;
}

/**
 * sticky directive need a fix width to correct => set width / min-width if UI break
 */
@Component({
    standalone: true,
    selector: 'bc-table',
    templateUrl: './bc-table.component.html',
    styleUrl: './bc-table.component.scss',
    imports: [
        CommonModule, StickyTableDirectiveModule, BCTextFieldComponent,
        BCDropdownModule, BCTableInputField, BCButtonComponent,
        BCRadioModule,
    ],
    host: { class: "bc-table" },
    encapsulation: ViewEncapsulation.None,
})
export class BCTableComponent implements OnChanges {

    public readonly CELL_TYPE: typeof CELL_TYPE = CELL_TYPE;

    @Input() public config: IConfigTable;
    @Input() public groupHeaders: ITableGroupHeader[];
    @Input() public headers: ITableHeader[];
    @Input() public rows: ITableRow[];
    @Input() public expandTemplate: TemplateRef<any>;
    @Input() public expandContext: IObject<any>;
    @Input() public maxHeight: number;

    @Output() public onRadioChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onExpandRow: EventEmitter<number> = new EventEmitter<number>();
    @Output() public deleteRowChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() public rowChange: EventEmitter<IUpdateRow> = new EventEmitter<IUpdateRow>();
    @Output() public addRowChange: EventEmitter<ITableRow> = new EventEmitter<ITableRow>();
    @Output() public onAccessRowChange: EventEmitter<ITableRow> = new EventEmitter<ITableRow>();

    @HostBinding('style.--max-height')
    get getMaxHeight(): string { return this.maxHeight ? `${this.maxHeight}px` : '100%'; }

    get enableAction(): boolean {
        return this.config && ( this.config.canAccess || this.config.canDelete || this.config.canEdit || !!this.expandTemplate );
    }

    public isAdd: boolean;
    public isScroll: boolean;
    public radioValue: any;
    public dspRows: ITableRowExtra[];
    public defaultRow: ITableRowExtra = { cells: [], isEdit: true };
    public expandRowAIdx: number;

    /**
     * @constructor
     * @param {SimpleChanges} changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if ( changes.rows ) {
            this.dspRows = _.cloneDeep( this.rows );
            this.clearAddDefaultRowValueCell();
        }

        if ( changes.headers && changes.headers.currentValue && this.config?.canAdd ) {
            this.clearAddDefaultRowValueCell();
            for ( let cnt = 0; cnt < this.headers.length; cnt++ ) { this.defaultRow.cells.push({ value: '' }); }
        }
    }

    /**
     * @param {number} index
     * @return {void}
     */
    public onRowDelete( index: number ) {
        this.deleteRowChange.emit( index );
    }

    /**
     * @param {ITableRow} row
     * @param {number} index
     * @return {void}
     */
    public valueChange( row: ITableRow, index: number ) {
        this.rowChange.emit({ index, row: _.pick( row, 'cells' ) });
    }

    /**
     * @param {number} index
     * @return {number}
     */
    public trackByFn( index: number ) {
        return index;
    }

    /**
     * @param {ITableRowExtra} row
     * @return {void}
     */
    public onRowEdit( row: ITableRowExtra ) {
        row.isEdit = true;
    }

    /**
     * @param {number} index
     * @return {void}
     */
    public onRowSave( index: number ) {
        if ( _.every( this.dspRows[ index ].cells, ( cell: ITableCell ) => !cell.value ) ) {
            this.dspRows[ index ].error = true;
            return;
        }

        this.dspRows[ index ].error = false;
        this.dspRows[ index ].isEdit = false;
        this.rowChange.emit({ index, row: _.pick( this.dspRows[ index ], 'cells' ) });
    }

    /**
     * @param {number} index
     * @return {void}
     */
    public onRowCancel( index: number ) {
        this.dspRows[ index ] = _.cloneDeep( this.rows[ index ] );
    }

    /**
     * @return {void}
     */
    public saveNewData() {
        if ( _.every( this.defaultRow.cells, ( cell: ITableCell ) => !cell.value ) ) {
            this.defaultRow.error = true;
            return;
        }

        this.defaultRow.isEdit = false;
        this.defaultRow.error = false;
        this.dspRows.unshift( _.cloneDeep( this.defaultRow ) );
        this.addRowChange.emit( this.defaultRow );
        this.clearAddDefaultRowValueCell();
    }

    /**
     * @return {void}
     */
    public clearAddDefaultRowValueCell() {
        this.isAdd = false;
        this._clearValueCell( this.defaultRow.cells );
    }

    /**
     * @param {ITableRowExtra} row
     * @return {void}
     */
    public onRowAccess( row: ITableRowExtra ) {
        if ( row.isEdit ) return;

        this.onAccessRowChange.emit( row );
    }

    /**
     * @param {IRadioGroupChange} selectedRadio
     * @return {void}
     */
    public onRadioSelect( selectedRadio: IRadioGroupChange ) {
        this.radioValue = selectedRadio.value;
        this.onRadioChange.emit( selectedRadio.value );
    }

    /**
     * @param {number} rowIndex
     * @return {void}
     */
    public expand( rowIndex: number ) {
        this.expandRowAIdx = this.expandRowAIdx === rowIndex ? undefined : rowIndex;

        this.onExpandRow.emit( this.expandRowAIdx );
    }

    /**
     * @param {ITableCell[]} cells
     * @return {void}
     */
    private _clearValueCell( cells: ITableCell[] ) {
        _.mapValues( cells, ( cell: ITableCell ) => cell.value = '' );
    }

}