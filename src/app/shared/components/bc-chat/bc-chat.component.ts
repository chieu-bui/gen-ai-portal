import {
    Component, ElementRef, Input,
    OnChanges, SimpleChanges, ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, Validators } from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject } from "rxjs";
import _ from 'lodash';

import { IModelAI } from "@shared/services/ai-models.service";
import { IChatMessage, IPayloadChatComplete } from "@components/chat/interfaces/chat.interface";
import { BCMessageComponent } from "./bc-message/bc-message.component";
import { BCAutoResizeTextarea } from "../bc-auto-resize-textarea/bc-auto-resize-textarea.component";
import { BCButtonComponent } from "../bc-button/bc-button.component";
import { BCMenuSingleFieldComponent } from "../bc-fields/bc-menu-field/bc-menu-single-field/bc-menu-single-field.component";
import { IOption } from "../bc-fields/bc-menu-field/bc-menu-field.common";

@Component({
    standalone: true,
    selector: 'bc-chat',
    templateUrl: './bc-chat.component.html',
    styleUrls: [ './bc-chat.component.scss' ],
    host: { class: 'bc-chat' },
    imports: [
        BCMessageComponent, BCAutoResizeTextarea, BCButtonComponent,
        BCMenuSingleFieldComponent, CommonModule,
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
    public modelSelectedControl: FormControl;
    public control: FormControl<string> = new FormControl<string>(undefined, [ Validators.required ]);
    public isGenerating: boolean;
    public stopResponseFlag: boolean;

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
            this.modelSelectedControl = new FormControl( this.modelSelected );
        }

        console.log( 'a', this.messages );
        
    }

    /**
     * @param {number} index
     * @param {any} data
     */
    public trackByFunc( index: number, data: any ) {
        return data ? data : index;
    }

    /**
     * @return {void}
     */
    public start() {
        this.stopResponseFlag = false;
        this.isGenerating = true;

        this.messages = [
            ...this.messages || [],
            { role: 'user', content: this.control.getRawValue() }
        ];

        const payload: IPayloadChatComplete = {
            id: uuidv4(),
            chat_id: this.activeChatId,
            stream: true,
            model: this.modelSelectedControl.getRawValue(),
            messages: this.messages,
        };

        this.control.patchValue('');
        this.messages.push({ role: 'assistant', content: '' });

        // this._chatService.completions( payload ); 

        const controller = new AbortController();

        fetch('http://localhost:3000/stream', {
            signal: controller.signal,
			method: 'POST',
		})
		.then( (res) => {
			const reader = res.body.getReader();
            const subject$: BehaviorSubject<string> = new BehaviorSubject<string>('');

            subject$.subscribe( ( text: string ) => {
                _.last( this.messages ).content += text;

                if ( !this.stopResponseFlag ) return;

                controller.abort();
                subject$.unsubscribe();
            } );
    
			reader.read().then( function pump({ done, value }) {
				const decodeStr: string = new TextDecoder().decode( value );
				const parseData: any = JSON.parse( decodeStr );
                subject$.next( parseData.choices?.[0]?.delta?.content || '' );
                
                if ( !done ) return reader.read().then( pump );

                console.log( 'done');
                this.isGenerating = false;
                subject$.unsubscribe();

			} )
            .catch( ( e: any ) => {
                console.log( e );
            })
		})
    }

    /**
     * @return {void}
     */
    public stop() {
        this.stopResponseFlag = true;
        this.isGenerating = false;
    }

}