import {
	AfterViewInit, Directive, ElementRef,
	Input, Optional, booleanAttribute,
} from '@angular/core';

import { StickyTableDirective } from './sticky-table.directive';

@Directive({ selector: '[stickyTop]' })
export class StickyTopDirective implements AfterViewInit {

	@Input({ transform: booleanAttribute }) public disabledTop: boolean;

	/**
	 * @constructor
	 * @param {ElementRef} _element 
	 * @param {StickyTableDirective} _table 
	 */
	constructor( private _element: ElementRef, @Optional() private _table: StickyTableDirective ) {}

	/**
	 * @constructor
	 */
	ngAfterViewInit() {
		if ( this.disabledTop ) return;
	
		const el: HTMLElement = this._element.nativeElement;
		const y: number = el.getBoundingClientRect()?.y;
	
		el.style.position = 'sticky';
		el.style.top = this._table ? `${Math.floor( y - this._table.y )}px` : '0px';
		el.style.zIndex = Number( el.style.zIndex ) > 200 ? el.style.zIndex : '200';
	}

}