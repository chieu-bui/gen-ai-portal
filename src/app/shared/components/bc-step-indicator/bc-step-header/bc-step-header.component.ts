import {
    Component, ViewEncapsulation, Input,
    TemplateRef, ViewChild,
} from "@angular/core";

@Component({
    selector: 'bc-step-header',
    templateUrl: './bc-step-header.component.html',
    styleUrls: [ './bc-step-header.component.scss' ],
    host: { class: 'bc-step-header' },
    encapsulation: ViewEncapsulation.None,
})
export class BCStepHeaderComponent {

    @ViewChild( TemplateRef ) public templateRef: TemplateRef<any>;

    @Input() public label: string;
    @Input() public classLabel: string;
    @Input() public styleLabel: string;

    private _icon: string ;
    
    @Input()
    get icon(): string { return this._icon; };
    set icon( _icon: string ) { this._icon = _icon ? `a-icon ${_icon}` : ''; }

}