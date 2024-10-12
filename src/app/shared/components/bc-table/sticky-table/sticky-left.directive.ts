import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

type IStickyPosition = 'header' | 'row';

@Directive({ selector: '[stickyLeft]' })
export class StickyLeftDirective implements AfterViewInit {
  
  @Input( 'stickyLeft' ) public stickyLeft: IStickyPosition = 'header';
  @Input() public stickyPosition: number = 0;
  @Input() public stickyRangeWidth: number[] = [];

  /**
   * @constructor
   * @param {ElementRef} _element
   */
  constructor( private _element: ElementRef ) {}

  /**
   * @constructor
   */
  ngAfterViewInit() {
    if ( !this.stickyRangeWidth?.length || this.stickyPosition > this.stickyRangeWidth?.length - 1 ) return;
	
    const el: HTMLElement = this._element.nativeElement;
    const left: number = this.stickyRangeWidth[ this.stickyPosition - 1 ] || 0;
    const width: number = this.stickyRangeWidth[ this.stickyPosition ];
  
    
    el.style.position = 'sticky';
    el.style.left = `${left}px`;
    el.style.width = `${width}px`;
    el.style.minWidth = `${width}px`;

    el.style.zIndex = this.stickyLeft === 'row'
    	? '100'
    	: Number( el.style.zIndex ) > 300 ? el.style.zIndex : '300';
    
  }

}