import {
    AfterViewInit, Component, ContentChild,
    HostBinding, HostListener, booleanAttribute,
    ViewChild, ViewEncapsulation, ElementRef,
    Input, TemplateRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";

import { BCDividerComponent } from "../bc-divider/bc-divider.component";
import { BCButtonComponent } from "../bc-button/bc-button.component";

@Component({
    standalone: true,
    selector: 'bc-resize-page',
    templateUrl: './bc-resize-page.component.html',
    styleUrls: [ './bc-resize-page.component.scss' ],
    host: { class: 'bc-resize-page' },
    imports: [ BCDividerComponent, CommonModule, BCButtonComponent ],
    encapsulation: ViewEncapsulation.None,
})
export class BCResizePageComponent implements AfterViewInit {

    @ViewChild( BCDividerComponent ) public bcDividerComp: BCDividerComponent;

    public readonly RESIZE_PERCENT_WIDTH: number = 0.5;
    public readonly MINIMUM_PERCENT_WIDTH: number = 0;
    public readonly MAXIMUM_PERCENT_WIDTH: number = 100;

    @ViewChild('leftPage') public leftPage: ElementRef;
    @ViewChild('rightPage') public rightPage: ElementRef;
    @ViewChild('resize') public resize: ElementRef;
    @ViewChild('page') public page: ElementRef;

    @ContentChild('leftResizePage') public leftResizePage: TemplateRef<any>;
    @ContentChild('rightResizePage') public rightResizePage: TemplateRef<any>;

    @Input() public leftPercentWidth: number = 50;
    @Input() public rightPercentWidth: number = 50;
    @Input() public minWidthLeftPx: number = 200;
    @Input() public minWidthRightPx: number = 200;
    @Input() public headerRightSide: string;
    @Input({ transform: booleanAttribute }) public open: boolean;

    @HostBinding('style.--left-resize-page-width')
    get leftResizeWidth() { return this.open ? `${this.leftPercentWidth}%` : `${this.MAXIMUM_PERCENT_WIDTH}%`; }

    @HostBinding('style.--right-resize-page-width')
    get rightResizeWidth() { return this.open ? `${this.rightPercentWidth}%` : `${this.MINIMUM_PERCENT_WIDTH}%`; }

    @HostBinding('style.--resize-width')
    get resizeWidth() { return this.open ? `${this.RESIZE_PERCENT_WIDTH}%` : `${this.MINIMUM_PERCENT_WIDTH}%`; }

    @HostBinding('style.--user-select')
    get userSelectStyle() { return this._isRezising ? 'none' : 'auto'; }

    get totalWidth() { return this.page?.nativeElement?.clientWidth; }
    get leftNativeEle() { return this.leftPage?.nativeElement; }
    get rightNativeEle() { return this.rightPage?.nativeElement; }
    get resizeEle() { return this.resize?.nativeElement; }
    
    private _isRezising: boolean;

    @HostListener('mousemove', ['$event'])
    public mousemove(event: any) {
        if ( !this._isRezising ) return;

        event.preventDefault();

        const leftWidth: number = event.clientX - this.leftNativeEle.offsetLeft;

        if ( leftWidth < this.minWidthLeftPx ) {
            this._setWidth( this.MINIMUM_PERCENT_WIDTH, this.MAXIMUM_PERCENT_WIDTH );
            return;
        }

        const leftPercent: number = ( leftWidth * this.MAXIMUM_PERCENT_WIDTH ) / this.totalWidth;
        const rightPercent: number = this.MAXIMUM_PERCENT_WIDTH - leftPercent - this.RESIZE_PERCENT_WIDTH;
        const rightWidth: number = rightPercent * this.totalWidth / this.MAXIMUM_PERCENT_WIDTH;

        rightWidth < this.minWidthRightPx
            ? this._setWidth( this.MAXIMUM_PERCENT_WIDTH, this.MINIMUM_PERCENT_WIDTH )
            : this._setWidth( leftPercent, rightPercent );
    }

    @HostListener('document:mouseup')
    public mouseup() {
        this._isRezising = false;
    }


    /**
     * @constructor
     */
    ngAfterViewInit(): void {
        this.resizeEle?.addEventListener( 'mousedown', () => this._isRezising = true );
    }

    /**
     * @param {boolean=} isHover
     * @return {void}
     */
    public setStyleDivider( isHover?: boolean ) {
        this.bcDividerComp.color = `var(${ isHover ? '--bosch-blue-60': '--bosch-gray-75' })`;
        this.bcDividerComp.thickness = `${ isHover ? 2 : 1 }px`;
    }

    /**
     * @param {number} leftPercentWidth
     * @param {number} rightPercentWidth
     * @return {void}
     */
    private _setWidth( leftPercentWidth: number, rightPercentWidth: number ) {
        this.leftPercentWidth = leftPercentWidth;
        this.rightPercentWidth = rightPercentWidth;
    }

}