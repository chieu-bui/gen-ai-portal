import { CELL_TYPE } from './constant';

export type ICellType = typeof CELL_TYPE[ keyof typeof CELL_TYPE ];

export interface IConfigTable {
    canAccess?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    canAdd?: boolean;
    fullBorder?: boolean;
    line?: number;
    customGroupHeaders?: ICustomHeader[];
    customHeaders?: ICustomHeader[];
    customRows?: ICustomRow[];
    typeColumns?: ICellType[];
    stickyLeftColWidths?: number[];
}

export interface ICustomHeader extends ICustomCss {}

export interface ICustomRow extends ICustomCss {
    rowspan?: number;
}

export interface ICustomCss {
    class?: string;
    style?: string;
}

export interface ICommon {
    value?: any;
}

export interface ITableHeader extends ICommon {}

export interface ITableCell extends ICommon {}

export interface ITableGroupHeader extends ICommon {
    colspan?: number;
}
export interface ITableRow {
    cells: ITableCell[];
}

export interface IUpdateRow {
    index: number;
    row: ITableRow;
}







