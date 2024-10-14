import {
    Component, ElementRef, Input,
    OnChanges, SimpleChanges, ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

import { BCMessageComponent } from "./bc-message/bc-message.component";
import { BCAutoResizeTextarea } from "../bc-auto-resize-textarea/bc-auto-resize-textarea.component";
import { BCButtonComponent } from "../bc-button/bc-button.component";
import { FormControl, Validators } from "@angular/forms";
import { BCMenuSingleFieldComponent } from "../bc-fields/bc-menu-field/bc-menu-single-field/bc-menu-single-field.component";
import { IModelAI } from "@shared/services/ai-models.service";
import { IOption } from "../bc-fields/bc-menu-field/bc-menu-field.common";
import { ChatService } from "@components/chat/services/chat.service";
import { IChatMessage, IPayloadChatComplete } from "@components/chat/interfaces/chat.interface";
import { untilCmpDestroyed } from "@shared/decorator";

@Component({
    standalone: true,
    selector: 'bc-chat',
    templateUrl: './bc-chat.component.html',
    styleUrls: [ './bc-chat.component.scss' ],
    host: { class: 'bc-chat' },
    imports: [
        BCMessageComponent, BCAutoResizeTextarea, BCButtonComponent,
        BCMenuSingleFieldComponent,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class BCChatComponent implements OnChanges {

    @ViewChild( BCAutoResizeTextarea ) public resizeTextarea: ElementRef;

    @Input() public modelList: IModelAI[];
    @Input() public modelSelected: string;
    @Input() public activeChatId: string;
    @Input() public messages: IChatMessage[];

    public modelOptions: IOption[];
    public modelSelectedControl: FormControl = new FormControl('');

    public content1: string = `I want to ask about htmlI want to ask about html`;
    public content2: string = `<p>HTML (HyperText Markup Language) is the standard language used to create and design web pages. It's the foundation of all websites and is responsible for structuring content on the web. Here’s an overview of key concepts in HTML:</p>`;

    public rowsLength: number = 1;

    public control: FormControl<string> = new FormControl<string>(undefined, [ Validators.required ]);
    public isGenerating: boolean;

    constructor( private _chatService: ChatService ) {}

    /**
     * @constructor
     * @param {SimpleChanges} changes
     */
    ngOnChanges( changes: SimpleChanges ): void {
        if ( changes.modelList && changes.modelList.currentValue ) {
            this.modelOptions = _.map( this.modelList, ( modelItem: IModelAI ) => {
                return { value: modelItem.id, label: modelItem.name };
            } );
        }

        if ( changes.modelSelected && changes.modelSelected.currentValue ) {
            this.modelSelectedControl.patchValue( this.modelSelected );
        }
    }

    /**
     * @return {void}
     */
    public start() {
        const payload: IPayloadChatComplete = {
            id: uuidv4(),
            chat_id: this.activeChatId,
            stream: true,
            model: this.modelSelectedControl.getRawValue(),
            messages: [
                ...this.messages || [],
                { role: 'user', content: this.control.getRawValue() }
            ],
        };

        this.control.patchValue('');
        
        this._chatService.completions( payload );
    }

    /**
     * @return {void}
     */
    public stop() {

    }

}