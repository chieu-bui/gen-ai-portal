import { ComponentRef, Directive, ElementRef, HostListener, Input } from "@angular/core";
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from "@angular/cdk/portal";
import _ from 'lodash';

import { BCTooltipComponent } from './bc-tooltip.component';
import { TOOLTIP_POSTION, ITooltipPostion } from "./constant";

@Directive({selector: '[tooltip]'})
export class BCTooltipDirective {

    @Input() public tooltip: any;
    @Input() public width: string;
    @Input() public maxWidth: string = '400px';
    @Input() public padding: string = '10px';
    @Input() public position: ITooltipPostion = 'top';
    @Input() public hidden: boolean;

    @HostListener('click')
    public onMouseClick(): void {
        this._overlayRef?.detach();
    }

    @HostListener('mouseover')
    public onMouseHover(): void {        
        if ( this.hidden ) return;
        
        this._open();
    }

    @HostListener('mouseleave')
    public onMouseOut() {
        if ( this.hidden || !this._overlayRef ) return;
        
        this._overlayRef.detach();
    }

    private _overlayRef: OverlayRef;

    /**
     * @constructor
     * @param {Overlay} _overlay
     * @param {ElementRef} _elementRef
     */
    constructor( private _overlay: Overlay, private _elementRef: ElementRef ) {}

    /**
     * @return {void}
     */
    private _open() {
        this._overlayRef?.detach();
        this._overlayRef = this._overlay.create({
            positionStrategy: this._overlay
                .position()
                .flexibleConnectedTo( this._elementRef )
                .withPositions( TOOLTIP_POSTION[ this.position ] as ConnectedPosition[] )
        });

        const component: ComponentPortal<BCTooltipComponent> = new ComponentPortal( BCTooltipComponent );
        const componentRef: ComponentRef<BCTooltipComponent> = this._overlayRef.attach( component );

        this._updateInstance( componentRef );
    }

    /**
     * @param {ComponentRef} componentRef
     * @return {void}
     */
    private _updateInstance( componentRef: ComponentRef<BCTooltipComponent> ) {
        componentRef.instance.tooltip = this.tooltip;
        componentRef.instance.width = this.width;
        componentRef.instance.maxWidth = this.maxWidth;
        componentRef.instance.padding = this.padding;
    }

}