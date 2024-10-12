import {
    AfterViewChecked, Directive, ElementRef,
    OnDestroy, ViewChild,
} from "@angular/core";
import { debounce } from 'lodash';

@Directive()
export abstract class BCResizeObserver implements AfterViewChecked, OnDestroy {

    @ViewChild('eleRef') public eleRef: ElementRef;

    get nativeElement(): any { return this.eleRef?.nativeElement };

    public abstract resizeDebounceFunc: ReturnType<typeof debounce>;
    public _resizeObservable: ResizeObserver;

    /**
     * @constructor
     */
    ngAfterViewChecked(): void {
        if ( this._resizeObservable
            || !this.nativeElement?.offsetHeight || !this.nativeElement?.scrollHeight
            || !this.nativeElement?.offsetWidth || !this.nativeElement?.scrollWidth
        ) return;
        
        this._resizeObservable = new ResizeObserver( this.resizeDebounceFunc );
        this._resizeObservable.observe( this.nativeElement.offsetParent );
        this._resizeObservable.observe( document.body );
    }

    /**
     * @constructor
     */
    ngOnDestroy(): void {
        this._resizeObservable?.disconnect();
    }
}