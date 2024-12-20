import {
    Component, ElementRef, Input,
    OnChanges, OnInit, SimpleChanges,
    ViewChild, ViewEncapsulation,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, Validators } from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject, Subject } from "rxjs";
import { EventSourceParserStream } from 'eventsource-parser/stream';
import _ from 'lodash';

import { untilCmpDestroyed } from "@shared/decorator";
import { IUser, UserService } from "@components/main/services/user.service";
import { IModelAI } from "@components/main/services/ai-models.service";
import { IChatMessage, IPayloadChatComplete } from "@components/chat/interfaces/chat.interface";
import { ChatService } from "@components/chat/services/chat.service";
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
export class BCChatComponent implements OnChanges, OnInit {

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
    public user: IUser;

    /**
     * @constructor
     * @param {ChatService} _chatService
     * @param {UserService} _userService
     */
    constructor( private _chatService: ChatService, private _userService: UserService ) {}

    /**
     * @constructor
     */
    ngOnInit(): void {
        this._userService.user$
        .pipe( untilCmpDestroyed( this ) )
        .subscribe( ( user: IUser ) => this.user = user );
    }

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
            { role: 'user', content: this.control.getRawValue(), id: uuidv4() }
        ];

        const controller = new AbortController();
        const payload: IPayloadChatComplete = {
            id: uuidv4(),
            chat_id: this.activeChatId,
            stream: true,
            model: this.modelSelectedControl.getRawValue(),
            files: _.find( this.modelList, ( model: IModelAI ) => model.id === this.modelSelected )?.info?.meta?.knowledge || [],
            messages: this.messages,
            signal: controller.signal,
        };

        this.control.patchValue('');
        this.messages.push({ role: 'assistant', content: '', id: uuidv4() });

        this._chatService.completions( payload ).then( ( res ) => {
            const eventStream = ( res.body as ReadableStream<Uint8Array>)
                .pipeThrough(new TextDecoderStream())
                .pipeThrough(new EventSourceParserStream())
                .getReader();

            const subject$: BehaviorSubject<string> = new BehaviorSubject<string>('');
            const doneSubject$: Subject<void> = new Subject<void>();

            doneSubject$.subscribe( () => {
                this.isGenerating = false;
                doneSubject$.unsubscribe();

                this._chatService.updateById( this.activeChatId, { messages: this.messages } )
                .pipe( untilCmpDestroyed( this ) )
                .subscribe();
            } );

            subject$.subscribe( ( text: string ) => {
                _.last( this.messages ).content += text;
                
                if ( !this.stopResponseFlag ) return;

                controller.abort();
                subject$.unsubscribe();
            } );

            eventStream.read().then( function pump( streamData: { done: boolean, value: any }) {
                
                if ( !streamData?.done && !streamData?.value?.data.includes( 'DONE' ) ) {
                    
                    const decodeStr: string = streamData?.value?.data;
                    const parseData: any = JSON.parse( decodeStr );
                    const message: string =  parseData.choices?.[0]?.delta?.content || '';
                    subject$.next( message );
                    
                    return eventStream.read().then( pump );
                }

                doneSubject$.next();
                subject$.unsubscribe();
            } )
            .catch( ( e: any ) => console.log( e ) );
        } );
    }

    /**
     * @return {void}
     */
    public stop() {
        this.stopResponseFlag = true;
        this.isGenerating = false;
    }

}