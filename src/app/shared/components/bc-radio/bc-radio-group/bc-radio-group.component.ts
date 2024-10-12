import {
    AfterViewInit, ChangeDetectorRef, Component,
    ContentChildren, EventEmitter, Input,
    Output, QueryList, SimpleChanges,
    ViewEncapsulation, OnChanges, TemplateRef,
} from "@angular/core";
import _ from 'lodash';

import { BCRadioComponent } from "../bc-radio/bc-radio.component";

export interface IRadioGroupChange {
    index: number;
    value: any;
}

@Component({
    selector: 'bc-radio-group',
    templateUrl: './bc-radio-group.component.html',
    styleUrls: [ './bc-radio-group.component.scss' ],
    host: { class: 'bc-radio-group' },
    encapsulation: ViewEncapsulation.None,
})
export class BCRadioGroupComponent implements AfterViewInit, OnChanges {
    
    @ContentChildren( BCRadioComponent ) public radios: QueryList<BCRadioComponent>;

    @Input() public value: any;

    @Output() public onChange: EventEmitter<IRadioGroupChange> = new EventEmitter<IRadioGroupChange>();

    get radioComponents(): BCRadioComponent[] { return this.radios?.toArray(); };

    public bcRadioTemplate: TemplateRef<any>[] = [];

    private _activeRadio: number;


    /**
     * @constructor
     * @param {ChangeDetectorRef} _cdRef
     */
    constructor( private _cdRef: ChangeDetectorRef ) {}

    /**
     * @constructor
     * @param {SimpleChanges} changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if ( changes.value && changes.value.currentValue ) {
            this._activeRadio = _.clone( this.value );
            this._setCheckedRadio();
        }
        
    }

    /**
     * @constructor
     */
    ngAfterViewInit(): void {
        this._setCheckedRadio();
        this._cdRef.detectChanges();
    }

    /**
     * @param {number} index
     * @return {void}
     */
    public onClick( index: number ) {
        const targetRadioComp: BCRadioComponent = this.radioComponents[ index ];

        if ( targetRadioComp.disabled || targetRadioComp.checked ) return;

        this._activeRadio = _.clone( targetRadioComp.value );

        this._setCheckedRadio();
        this.onChange.emit({ index, value: this._activeRadio });
    } 

    /**
     * @return {void}
     */
    private _setCheckedRadio() {
        const isInit: boolean = !!this.bcRadioTemplate?.length;

        _.forEach( this.radioComponents, ( radio: BCRadioComponent ) => {
            !isInit && this.bcRadioTemplate.push( radio.bcRadio );
            
            radio.checked = this._activeRadio === radio.value;
        } );
    }

}