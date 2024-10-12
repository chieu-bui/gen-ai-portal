import {
    Component, Input, TemplateRef,
    ViewChild, ViewEncapsulation, booleanAttribute,
} from "@angular/core";

@Component({
    selector: 'bc-radio',
    templateUrl: './bc-radio.component.html',
    styleUrls: [ './bc-radio.component.scss' ],
    host: { class: 'bc-radio' },
    encapsulation: ViewEncapsulation.None,
})
export class BCRadioComponent {

    @ViewChild( 'bcRadio' ) public bcRadio: TemplateRef<any>;

    @Input({ transform: booleanAttribute }) public disabled: boolean;
    @Input() public value: any;

    public checked: boolean;

}