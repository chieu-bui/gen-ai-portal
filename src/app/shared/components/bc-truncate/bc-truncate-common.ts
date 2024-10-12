import { ChangeDetectorRef, Directive, Input, HostBinding } from "@angular/core";
import { debounce } from 'lodash';

import { BCResizeObserver } from "../../directives/bc-resize-observable.directive";

@Directive()
export abstract class BCTruncateCommon extends BCResizeObserver {

    @Input() public line: number;

    @HostBinding('style.--line-clamp')
    get lineClamp(): number { return this.line || 1; }

    public isTruncate: boolean;

    /**
     * @return {void}
     */
    private _checkShowTooltip = () => {
        const newValue: boolean = this.nativeElement?.offsetWidth < this.nativeElement?.scrollWidth
            || this.nativeElement?.offsetHeight < this.nativeElement?.scrollHeight;

        if ( newValue === !!this.isTruncate ) return;
    
        this.isTruncate = newValue;
        this._cdRef.detectChanges();
    }

    public resizeDebounceFunc: ReturnType<typeof debounce> = debounce( this._checkShowTooltip.bind( this ), 200 );

    /**
     * @constructor
     * @param {ChangeDetectorRef} _cdRef
     */
    constructor( protected _cdRef: ChangeDetectorRef ) {
        super();
    }

    /**
     * @return {void}
     */
    public checkTooltip() {
        this.resizeDebounceFunc();
    }

}