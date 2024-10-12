import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import _ from 'lodash';

import { Unsubscriber, untilCmpDestroyed } from "@shared/decorator";
import { BCTruncateComponent } from "@shared/components/bc-truncate/bc-truncate.component";
import { BCSearchBoxComponent } from "@shared/components/bc-fields/bc-search-box/bc-search-box.component";
import { ChatService } from "../services/chat.service";
import { IChatItem } from "../interfaces/chat.interface";
import { BCButtonComponent } from "@shared/components/bc-button/bc-button.component";

@Unsubscriber()
@Component({
    standalone: true,
    selector: 'chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: [ './chat-list.component.scss' ],
    imports: [ CommonModule, BCTruncateComponent, BCSearchBoxComponent, BCButtonComponent ],
    providers: [ ChatService ],
})
export class ChatListComponent implements OnInit {

    @Output() public selectedChatIdEvent: EventEmitter<string> = new EventEmitter<string>();

    public dspChatlist: IChatItem[];
    public activeId: string;

    private _chatList: IChatItem[];

    /**
     * @constructor
     * @param {ChatService} _chatService
     */
    constructor( private _chatService: ChatService ) {}

    /**
     * @constructor
     */
    ngOnInit(): void {
        this._chatService.getList()
        .pipe( untilCmpDestroyed( this ) )
        .subscribe( ( chatitem: IChatItem[] ) => {
            this._chatList = chatitem;
            this.activeId = _.first( chatitem )?.id;
            this.onSearch();
        } );
    }

    /**
     * @param {number} index
     * @param {any} data
     */
    public trackByFunc( index: number, data: any ) {
        return data ? data : index;
    }

    /**
     * @param {string} id
     * @param {void}
     */
    public setActiveChat( id: string ) {
        this.activeId = id;
        this.selectedChatIdEvent.emit( id );
    }

    /**
     * @param {string=} search
     * @param {void}
     */
    public onSearch( search?: string ) {
        this.dspChatlist = search
            ? _.filter( this._chatList, ( item: IChatItem ) => item.title.toLowerCase().includes( search.toLowerCase() ) )
            : _.clone( this._chatList );
    }

    /**
     * @param {void}
     */
    public createChat() {

    }

}