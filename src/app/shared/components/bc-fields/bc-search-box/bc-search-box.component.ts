import {
    AfterViewInit, Component, ViewEncapsulation,
    EventEmitter, Output, Input,
    ViewChild, OnChanges, SimpleChanges,
    booleanAttribute,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { Observable, Observer, finalize, isObservable } from "rxjs";
import _ from "lodash";

import { Unsubscriber, untilCmpDestroyed } from "@shared/decorator";
import { BCButtonComponent } from "@shared/components/bc-button/bc-button.component";
import { DisableControlDirective } from "@shared/directives/disable-control.directive";
import { BCTooltipModule } from "@shared/components/bc-tooltip/bc-tooltip.module";
import { BCTruncateComponent } from "@shared/components/bc-truncate/bc-truncate.component";
import { BCDropdownModule } from "@shared/components/bc-dropdown/bc-dropdown.module";
import { BCLoaderComponent } from "@shared/components/bc-loader/bc-loader.component";
import { BCDropdownComponent } from "@shared/components/bc-dropdown/bc-dropdown.component";
import { BCCommonField } from "../bc-common-field.component";
import { BCFormFieldComponent } from "../bc-form-field/bc-form-field.component";
import { IOption } from "../bc-menu-field/bc-menu-field.common";

@Unsubscriber()
@Component({
    standalone: true,
    selector: 'bc-search-box',
    templateUrl: './bc-search-box.component.html',
    styleUrls: [ '../bc-common-field.component.scss', './bc-search-box.component.scss' ],
    imports: [
        CommonModule, ReactiveFormsModule, BCFormFieldComponent,
        DisableControlDirective, BCButtonComponent, BCTooltipModule,
        BCDropdownModule, BCTruncateComponent, BCLoaderComponent,
    ],
    host: { class: 'bc-search-box' },
    encapsulation: ViewEncapsulation.None,
})
export class BCSearchBoxComponent extends BCCommonField implements AfterViewInit, OnChanges {

    @ViewChild( 'searchBoxMenu' ) public searchBoxMenu: BCDropdownComponent;

    @Input({ transform: booleanAttribute }) public searchMenu: boolean;
    @Input() public options: Observable<IOption[]> | IOption[] | Function;

    @Output() public onSearchChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() public onSelected: EventEmitter<IOption> = new EventEmitter<IOption>();

    public isLoading: boolean;
    public dspOptions: IOption[];

    private _onSearchDebounce: ReturnType<typeof _.debounce> = _.debounce( this.onSearch.bind( this ), 300 );

    ngOnChanges(changes: SimpleChanges): void {
        if ( changes.options && _.isArray( this.options ) ) {
            this.dspOptions = this.options;
        }
    }

    /**
     * @constructor
     */
    ngAfterViewInit(): void {
        this.eleRef.nativeElement.addEventListener( 'keydown', (event: any) => {
            this._onSearchDebounce();
            event.key === 'Escape' && this.searchBoxMenu.closed.emit();
        } );
    }

    /**
     * @return {void}
     */
    public onClear() {
        this.searchControl.setValue(undefined);
        this.control.setValue(undefined);
        this._search();
        this.checkTooltip();
    }

    /**
     * @return {void}
     */
    public onSearch() {
        this._search();
    }

    /**
     * @return {void}
     * @param {IOption} option
     */
    public onChange( option: IOption ) {
        if ( this.searchMenu ) {
            this.searchControl.setValue( option.value );
            this.control.setValue( option.value );
        }

        this.onSelected.emit( option );
        this.checkTooltip();
    }

    /**
     * @param {number} index
     * @param {any} data
     */
    public trackByFn( index: number, data: any ) {
        return data ? data : index;
    }

    /**
     * @return {void}
     */
    private _search() {
        this.onSearchChange.emit( this.searchControl.value );

        if ( !this.searchMenu || !this.options ) return;

        let observable: Observable<IOption[]> = isObservable( this.options )
            ? this.options
            : _.isArray( this.options ) && this._createOb( this.options );

        if ( !observable ) {
            const optionFunc: Observable<IOption[]> | IOption[] = ( this.options as Function )( this.control.value );
            observable = isObservable( optionFunc ) ? optionFunc : this._createOb( optionFunc );
        }

        this.isLoading = true;

        observable
        .pipe( finalize( () => this.isLoading = false ), untilCmpDestroyed( this ) )
        .subscribe( ( options: IOption[] ) => this.dspOptions = options );
    }

    /**
     * @param {IOption[]} options
     * @return {Observable}
     */
    private _createOb( options: IOption[] ): Observable<IOption[]> {
        return new Observable<IOption[]>( ( observer: Observer<IOption[]> ) => {
            observer.next( options );
            observer.complete();
        } );
    }

}
