import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import _ from 'lodash';

import { Unsubscriber, untilCmpDestroyed } from '@shared/decorator';
import { BCChatComponent } from '@shared/components';
import { IModelAI, IModelAIData, ModelAIService } from '@shared/services/ai-models.service';
import { SupergraphicComponent } from '@shared/components/supergraphic/supergraphic.component';
import { AuthService, IUser } from '@shared/services/auth.service';
import { BCTruncateComponent } from '@shared/components/bc-truncate/bc-truncate.component';
import { BCDropdownModule } from '@shared/components/bc-dropdown/bc-dropdown.module';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { ChatService } from '@components/chat/services/chat.service';
import { IChat, IChatItem, IChatMessage, IChatResponse } from '@components/chat/interfaces/chat.interface';
import { BCButtonComponent } from "../../shared/components/bc-button/bc-button.component";

@Unsubscriber()
@Component({
    standalone: true,
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: [ './main.component.scss' ],
    imports: [
        CommonModule, SidebarComponent, BCChatComponent,
        SupergraphicComponent, BCButtonComponent, BCTruncateComponent,
        BCDropdownModule,
    ],
})
export class MainComponent implements OnInit {
    
    public chatId: string;
    public chatList: IChatItem[];
    public modelList: IModelAI[];
    public modelSelected: string;
    public messages: IChatMessage[];
    public user: IUser;

    public src: string;

    /**
     * @Constructor
     * @param {ModelAIService} _modelAIService
     * @param {ChatService} _chatService
     * @param {AuthService} _authService
     */
    constructor(
        private _modelAIService: ModelAIService,
        private _chatService: ChatService,
        private _authService: AuthService
    ) {}

    /**
     * @constructor
     */
    ngOnInit(): void {
        this.user = this._authService.user;

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
            this.messages = _.map( chatResponse.chat.messages, ( message: any ) => {
                return { role: message.role, content: message.content };
            } );
            
            
            this.src = _.last( chatResponse.chat.messages )?.content;
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