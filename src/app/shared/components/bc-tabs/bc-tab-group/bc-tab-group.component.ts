import {
    AfterContentInit, Component, ContentChildren,
    EventEmitter, Input, Output,
    QueryList, TemplateRef, ViewEncapsulation,
    booleanAttribute,
} from "@angular/core";
import _ from 'lodash';

import { BCTabComponent } from "../bc-tab/bc-tab.component";

type IPositionTab = 'left' | 'right' | 'center';

@Component({
    selector: 'bc-tab-group',
    templateUrl: './bc-tab-group.component.html',
    styleUrls: [ './bc-tab-group.component.scss' ],
    host: { class: 'bc-tab-group' },
    encapsulation: ViewEncapsulation.None,
})
export class BCTabGroupComponent implements AfterContentInit {

    @ContentChildren( BCTabComponent ) public tabs: QueryList<BCTabComponent>;

    @Input() public position: IPositionTab = 'left';
    @Input({ transform: booleanAttribute }) public stretch: boolean;
    @Input() public value: any;

    @Output() public onChange: EventEmitter<number> = new EventEmitter<number>();

    public tabLabels: TemplateRef<any>[];
    public tabContents: TemplateRef<any>[];
    public activeTab: number = 0;

    /**
     * @constructor
     */
    ngAfterContentInit(): void {
        this.tabLabels = [];
        this.tabContents = [];

        _.forEach( this.tabs.toArray(), ( tab: BCTabComponent, index: number ) => {
            this.tabLabels.push( tab.bcTabLabel );
            this.tabContents.push( tab.bcTabContent );

            if ( tab.active ) this.activeTab = index;
        } );
    }

    /**
     * @param {number} tabIndex
     * @return {void}
     */
    public onChangeTab( tabIndex: number ) {
        if ( this.activeTab === tabIndex ) return;

        this.activeTab = tabIndex;
        this.onChange.emit( tabIndex );
    }

}