import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import _ from 'lodash';

import { Unsubscriber, untilCmpDestroyed } from '@shared/decorator';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { BCChatComponent } from '@shared/components';
import { IModelAI, IModelAIData, ModelAIService } from '@shared/services/ai-models.service';
import { ChatService } from '@components/chat/services/chat.service';
import { forkJoin } from 'rxjs';
import { IChat, IChatItem, IChatResponse } from '@components/chat/interfaces/chat.interface';

@Unsubscriber()
@Component({
    standalone: true,
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: [ './main.component.scss' ],
    imports: [ CommonModule, SidebarComponent, BCChatComponent ],
})
export class MainComponent implements OnInit {
    
    public chatId: string;
    public chatList: IChatItem[];
    public modelList: IModelAI[];
    public modelSelected: string;

    /**
     * @Constructor
     * @param {ModelAIService} _modelAIService
     * @param {ChatService} _chatService
     */
    constructor(
        private _modelAIService: ModelAIService,
        private _chatService: ChatService,
    ) {}

    /**
     * @constructor
     */
    ngOnInit(): void {
        forkJoin([
            this._chatService.getList(),
            this._modelAIService.getModelAIList(),
        ])
        .pipe( untilCmpDestroyed( this ) )
        .subscribe( ( [ chatList, modeAIData ] : [ IChatItem[], IModelAIData ] ) => {
            this.modelList = modeAIData.data;
            this.chatList = chatList;

            this.changeChatWindow( _.first( chatList )?.id );
        } );
    }

    /**
     * @param {string} chatId
     * @return {void}
     */
    public changeChatWindow( chatId: string ) {
        this.chatId = chatId;

        this._chatService.getById( this.chatId )
        .pipe( untilCmpDestroyed( this ) )
        .subscribe( ( chatResponse: IChatResponse ) => {
            this.modelSelected = chatResponse.chat.models[ 0 ];
        } );
    }

    /**
     * @return {void}
     */
    public createNewChat() {
        const newChat: IChat = { id: "", title: "New Chat", models: [ "azure_openai" ] };

        this._chatService.create( newChat )
        .pipe( untilCmpDestroyed( this ) )
        .subscribe();
    }

}