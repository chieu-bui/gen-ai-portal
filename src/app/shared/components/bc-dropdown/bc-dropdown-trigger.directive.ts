import {
  Directive, ElementRef, EventEmitter,
  HostListener, Input, OnDestroy,
  Output, TemplateRef, ViewContainerRef,
} from "@angular/core";
import { merge, Observable, Subscription } from 'rxjs';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from "@angular/cdk/portal";

export interface IDropdownPanel {
    templateRef: TemplateRef<any>;
    readonly closed: EventEmitter<void>;
}

type IPosition = 'below' | 'after';

@Directive({ selector: '[dropdownTriggerFor]' })
export class DropdownTriggerForDirective implements OnDestroy {

    @Input('dropdownTriggerFor') public dropdownPanel: IDropdownPanel;
    @Input() public position: IPosition = 'below';
    @Input() public isSyncWidth: boolean;
    @Input() public isTooltip: boolean;
    @Input() public offsetX: number;
    @Input() public offsetY: number;
  
    @Output() public menuOpen: EventEmitter<void> = new EventEmitter<void>;
    @Output() public menuClose: EventEmitter<void> = new EventEmitter<void>;

    private isDropdownOpen: boolean;
    private overlayRef: OverlayRef;
    private dropdownClosingActionsSub = Subscription.EMPTY;

    @HostListener('click')
    public onClick() {
    	this.toggleDropdown();
    }

    /**
     * @constructor
     * @param {Overlay} overlay
     * @param {ElementRef} elementRef 
     * @param {ViewContainerRef} viewContainerRef 
     */
    constructor(
    	private overlay: Overlay,
    	private elementRef: ElementRef<HTMLElement>,
    	private viewContainerRef: ViewContainerRef
    ) {}

    /**
     * @constructor
     */
    ngOnDestroy(): void {
    	this.overlayRef && this.overlayRef.dispose();
    }
  
    /**
     * @return {void}
     */
    public toggleDropdown(): void {
      if ( !this.dropdownPanel ) return;
  
    	this.isDropdownOpen ? this.destroyDropdown() : this.openDropdown();
    }
  
    /**
     * @return {void}
     */
    private openDropdown(): void {
		this.overlayRef = this.overlay.create({
			hasBackdrop: true,
			backdropClass: 'cdk-overlay-transparent-backdrop',
			scrollStrategy: this.overlay.scrollStrategies.close(),
			positionStrategy: this.overlay
				.position()
				.flexibleConnectedTo(this.elementRef)
				.withPositions([ this.getPosition() ]),
		});

		this.syncWidth();

		const templatePortal = new TemplatePortal( this.dropdownPanel.templateRef, this.viewContainerRef );
  
		this.overlayRef.attach(templatePortal);
		this.menuOpen.emit();

		this.isDropdownOpen = true;
		this.dropdownClosingActionsSub = this.dropdownClosingActions().subscribe( () => this.destroyDropdown() );
    }

    /**
     * @return {ConnectedPosition}
     */
    private getPosition(): ConnectedPosition {
      let res: ConnectedPosition;

      switch ( this.position ) {
        case 'below':
        	res = {
            	originX: 'center',
            	originY: 'bottom',
            	overlayX: 'center',
            	overlayY: 'top',
				offsetX: this.offsetX || 0,
            	offsetY: this.offsetY || 8,
        	};
			break;
        case 'after':
          	res = {
				originX: 'end',
				originY: 'top',
				overlayX: 'start',
				overlayY: 'center',
				offsetX: this.offsetX || 10,
				offsetY: this.offsetY || 12,
			}
          break;
    	}

    	return res;
    }
  
    /**
     * @return {Observable}
     */
    private dropdownClosingActions(): Observable<MouseEvent | void> {
    	const backdropClick$ = this.overlayRef.backdropClick();
    	const detachment$ = this.overlayRef.detachments();
    	const dropdownClosed = this.dropdownPanel.closed;

    	return merge( backdropClick$, detachment$, dropdownClosed );
    }
  
    /**
     * @return {void}
     */
    private destroyDropdown(): void {
    	if ( !this.overlayRef || !this.isDropdownOpen ) return;
  
      	this.isDropdownOpen = false;

		this.menuClose.emit();
      	this.dropdownClosingActionsSub.unsubscribe();
      	this.overlayRef.detach();
    }
  
    /**
     * @return {void}
     */
    private syncWidth() {
        if ( !this.isSyncWidth || !this.overlayRef ) return;
  
        const refRect = this.elementRef.nativeElement.getBoundingClientRect();
        this.overlayRef.updateSize({ width: refRect.width });
    }

}