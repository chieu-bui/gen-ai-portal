import {
    Component, EventEmitter, Input,
    OnChanges, Output, SimpleChanges,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import _ from 'lodash';

import { BCTruncateComponent } from "@shared/components/bc-truncate/bc-truncate.component";
import { BCSearchBoxComponent } from "@shared/components/bc-fields/bc-search-box/bc-search-box.component";
import { BCButtonComponent } from "@shared/components/bc-button/bc-button.component";
import { IChatItem } from "../interfaces/chat.interface";

@Component({
    standalone: true,
    selector: 'chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: [ './chat-list.component.scss' ],
    imports: [ CommonModule, BCTruncateComponent, BCSearchBoxComponent, BCButtonComponent ]
})
export class ChatListComponent implements OnChanges {

    @Input() public chatList: IChatItem[];
    @Input() public activeChatId: string;

    @Output() public selectedChatIdEvent: EventEmitter<string> = new EventEmitter<string>();
    @Output() public createChatEvent: EventEmitter<void> = new EventEmitter<void>();

    public dspChatlist: IChatItem[];

    /**
     * @constructor
     * @param {SimpleChanges} changes
     */
    ngOnChanges( changes: SimpleChanges ): void {
        if ( changes.chatList && changes.chatList.currentValue?.length ) {
            this.onSearch();
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
     * @param {string} id
     * @param {void}
     */
    public setActiveChat( id: string ) {
        this.selectedChatIdEvent.emit( id );
    }

    /**
     * @param {string=} search
     * @param {void}
     */
    public onSearch( search?: string ) {
        this.dspChatlist = search
            ? _.filter( this.chatList, ( item: IChatItem ) => item.title.toLowerCase().includes( search.toLowerCase() ) )
            : _.clone( this.chatList );
    }

    /**
     * @param {void}
     */
    public createChat() {
        this.createChatEvent.emit();
    }

}