import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, tap } from 'rxjs';
import _ from 'lodash';

import { Unsubscriber, untilCmpDestroyed } from '@shared/decorator';
import { BCChatComponent } from '@shared/components';
import { IModelAI, IModelAIData, IModelAIInfo, ModelAIService } from '@components/main/services/ai-models.service';
import { SupergraphicComponent } from '@shared/components/supergraphic/supergraphic.component';
import { BCTruncateComponent } from '@shared/components/bc-truncate/bc-truncate.component';
import { BCDropdownModule } from '@shared/components/bc-dropdown/bc-dropdown.module';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { ChatService } from '@components/chat/services/chat.service';
import { IChat, IChatItem, IChatMessage, IChatResponse } from '@components/chat/interfaces/chat.interface';
import { BCButtonComponent } from '@shared/components/bc-button/bc-button.component';

@Unsubscriber()
@Component({
    standalone: true,
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: [ './main.component.scss' ],
    imports: [
        CommonModule, SidebarComponent, BCChatComponent,
        SupergraphicComponent, BCTruncateComponent, BCDropdownModule,
        BCButtonComponent,
    ],
})
export class MainComponent implements OnInit {
    
    public chatId: string;
    public knowledge: IModelAIInfo;
    public chatList: IChatItem[];
    public modelList: IModelAI[];
    public modelSelected: string;
    public messages: IChatMessage[];
    public isCloseSidebar: boolean;

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

            if ( !chatList?.length ) return;

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
        } );
    }

    /**
     * @return {void}
     */
    public createNewChat() {
        this._chatService.create({
            id: "",
            title: "New Chat",
            models: [ _.first( this.modelList )?.id ] 
        })
        .pipe( tap( ( data: any ) => this._getChatList( data.id ) ), untilCmpDestroyed( this ) )
        .subscribe();
    }

    /**
     * @return {void}
     * @param {string} id
     */
    public deleteChat( id: string ) {
        this._chatService.deleteById( id )
        .pipe( tap( () => this._getChatList() ), untilCmpDestroyed( this ) )
        .subscribe();
    }

    /**
     * @return {void}
     * @param {IChat} chat
     */
    public updateChat( data: { chat: IChat, id: string } ) {
        this._chatService.updateById( data.id, data.chat )
        .pipe( tap( () => this._getChatList() ), untilCmpDestroyed( this ) )
        .subscribe();
    }

    /**
     * @return {void}
     * @param {string} selectedChatId
     */
    private _getChatList( selectedChatId?: string ) {
        this._chatService.getList()
        .pipe( untilCmpDestroyed( this ) )
        .subscribe( ( chatList: IChatItem[] ) => {
            this.chatList = chatList;

            if ( selectedChatId ) {
                this.changeChatWindow( selectedChatId );
                return;
            }

            if ( this.chatList?.length ) {
                this.changeChatWindow( _.first( this.chatList )?.id );
                return;
            }

            this.chatId = undefined;
        } );
    }

}