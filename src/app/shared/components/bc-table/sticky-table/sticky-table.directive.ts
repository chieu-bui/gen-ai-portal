import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[stickyTable]' })
export class StickyTableDirective {

	/**
	 * @constructor
	 * @param {ElementRef} element
	 */
	constructor( private element: ElementRef ) {}

	get x() {
		return ( this.element.nativeElement as HTMLElement )?.getBoundingClientRect()?.x;
	}

	get y() {
		return ( this.element.nativeElement as HTMLElement )?.getBoundingClientRect()?.y;
	}

}