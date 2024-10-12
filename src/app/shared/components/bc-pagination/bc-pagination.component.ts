import {
    Component, Input, OnChanges,
    Output, ViewEncapsulation, SimpleChanges,
    EventEmitter,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    standalone: true,
    selector: 'bc-pagination',
    templateUrl: './bc-pagination.component.html',
    styleUrls: [ './bc-pagination.component.scss' ],
    host: { class: 'bc-pagination' },
    imports: [ CommonModule ],
    encapsulation: ViewEncapsulation.None,
})
export class BCPaginationComponent implements OnChanges {

    public readonly SHOW_ALL: number = 10;
    public readonly MAX_ITEM: number = 5;
    public readonly MIN_ITEM: number = 2;

    @Input() public selected: number = 0;
    @Input() public totalPages: number;

    @Output() public selectedChange: EventEmitter<number> = new EventEmitter<number>();

    public leftSide: number[] = [];
    public rightSide: number[] = [];
    public middleSide: number[] = [];

    /**
     * @constructor
     * @param {SimpleChanges} changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if ( changes.totalPages && changes.totalPages.currentValue ) {
            this._arrange();
        }
    }

    /**
     * @param {number} page 
     * @return {void}
     */
    public select( page: number ) {
        if ( this.selected === page ) return;

        this.selected = page;
        this._arrange();
    }
    
    /**
     * @return {void}
     */
    public previous() {
        if ( !this.selected ) return;

        this.selected -= 1;
        this._arrange();
    }

    /**
     * @return {void}
     */
    public next() {
        if ( this.selected === this.totalPages - 1 ) return;

        if ( !this.selected ) this.selected = 0;

        this.selected += 1;
        this._arrange();
    }

    /**
     * @return {void}
     */
    private _arrange() {
        this.selectedChange.emit( this.selected );

        if ( this.totalPages < this.SHOW_ALL ) {
            const leftSide: number[] = [];

            for( let num = 0; num < this.totalPages; num++ ) { leftSide.push( num ); }

            this.leftSide = leftSide;
            return;
        }
        
        const leftSide: number[] = [];
        const rightSide: number[] = [];
        const middleSide: number[] = [];

        if ( this.selected < this.MAX_ITEM ) {
            for( let num = 0; num <= this.MAX_ITEM; num++ ) { leftSide.push( num ); }
            for( let num = this.totalPages - this.MIN_ITEM; num < this.totalPages; num++ ) { rightSide.push( num ); }
        } else if ( this.selected > this.totalPages - this.MAX_ITEM ) {
            for( let num = 0; num < this.MIN_ITEM; num++ ) { leftSide.push( num ); }
            for( let num = this.totalPages - this.MAX_ITEM - 1; num < this.totalPages; num++ ) { rightSide.push( num ); }
        } else {
            for( let num = 0; num < this.MIN_ITEM; num++ ) { leftSide.push( num ); }
            for( let num = this.totalPages - this.MIN_ITEM; num < this.totalPages; num++ ) { rightSide.push( num ); }

            const startPage: number = this.selected - this.MIN_ITEM;

            for( let num = startPage; num < startPage + this.MAX_ITEM; num++ ) { middleSide.push( num ); }
        }

        this.leftSide = leftSide;
        this.rightSide = rightSide;
        this.middleSide = middleSide;
    }

}