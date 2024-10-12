import { Component, ElementRef, ViewChild, ViewEncapsulation } from "@angular/core";

import { BCMessageComponent } from "./bc-message/bc-message.component";
import { BCAutoResizeTextarea } from "../bc-auto-resize-textarea/bc-auto-resize-textarea.component";
import { BCButtonComponent } from "../bc-button/bc-button.component";
import { FormControl, Validators } from "@angular/forms";

@Component({
    standalone: true,
    selector: 'bc-chat',
    templateUrl: './bc-chat.component.html',
    styleUrls: [ './bc-chat.component.scss' ],
    host: { class: 'bc-chat' },
    imports: [BCMessageComponent, BCAutoResizeTextarea, BCButtonComponent],
    encapsulation: ViewEncapsulation.None,
})
export class BCChatComponent {

    @ViewChild( BCAutoResizeTextarea ) public resizeTextarea: ElementRef;

    public content1: string = `I want to ask about htmlI want to ask about html`;
    public content2: string = `<p>HTML (HyperText Markup Language) is the standard language used to create and design web pages. It's the foundation of all websites and is responsible for structuring content on the web. Here’s an overview of key concepts in HTML:</p>`;

    public rowsLength: number = 1;

    public control: FormControl<string> = new FormControl<string>(undefined, [ Validators.required ]);
    public isGenerating: boolean;

    /**
     * @return {void}
     */
    public start() {
        this.control.patchValue('');
    }

    /**
     * @return {void}
     */
    public stop() {

    }

}