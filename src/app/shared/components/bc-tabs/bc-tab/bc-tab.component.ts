import {
    Component, ContentChild, Input,
    TemplateRef, ViewEncapsulation,
    booleanAttribute,
} from "@angular/core";

@Component({
    selector: 'bc-tab',
    template: "<ng-container></ng-container>",
    styleUrls: [ './bc-tab.component.scss' ],
    host: { class: 'bc-tab' },
    encapsulation: ViewEncapsulation.None,
})
export class BCTabComponent {

    @ContentChild('bcTabLabel') public bcTabLabel: TemplateRef<any>;
    @ContentChild('bcTabContent') public bcTabContent: TemplateRef<any>;

    @Input({ transform: booleanAttribute }) public active: boolean;

}