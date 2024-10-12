import {
    AfterViewInit, Component, ViewEncapsulation,
    ContentChildren, QueryList, Input,
    ChangeDetectorRef,
} from "@angular/core";
import _ from 'lodash';

import { BCStepComponent } from "../bc-step/bc-step.component";
import { BCStepHeaderComponent } from "../bc-step-header/bc-step-header.component";

@Component({
    selector: 'bc-step-group',
    templateUrl: './bc-step-group.component.html',
    styleUrls: [ './bc-step-group.component.scss' ],
    host: { class: 'bc-step-group' },
    encapsulation: ViewEncapsulation.None,
})
export class BCStepGroupComponent implements AfterViewInit {

    @ContentChildren( BCStepComponent ) public stepList: QueryList<BCStepComponent>;

    @Input() public activeStep: number = 0;

    public stepHeaders: BCStepHeaderComponent[];

    /**
     * @constructor
     * @param {ChangeDetectorRef} _cdRef
     */
    constructor( private _cdRef: ChangeDetectorRef ) {}

    /**
     * @constructor
     */
    ngAfterViewInit(): void {
        this.stepHeaders = _.map( this.stepList.toArray(), 'stepHeader' );
        this._cdRef.detectChanges();
    }

    /**
     * @param {number} index
     * @return {number}
     */
    public trackByFn( index: number ) {
        return index;
    }

}