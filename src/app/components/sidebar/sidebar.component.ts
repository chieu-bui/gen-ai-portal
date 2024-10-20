import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";

import { ChatListComponent } from "@components/chat/chat-list/chat-list.component";
import { IChat, IChatItem } from "@components/chat/interfaces/chat.interface";

@Component({
    standalone: true,
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: [ './sidebar.component.scss' ],
    imports: [ CommonModule, ChatListComponent ],
})
export class SidebarComponent {
    
    @Input() public chatList: IChatItem[];
    @Input() public activeChatId: string;

    @Output() public selectedChatIdEvent: EventEmitter<string> = new EventEmitter<string>();
    @Output() public createChatEvent: EventEmitter<void> = new EventEmitter<void>();
    @Output() public deleteEvent: EventEmitter<string> = new EventEmitter<string>();
    @Output() public updateEvent: EventEmitter<{ chat: IChat, id: string }> = new EventEmitter<{ chat: IChat, id: string }>();

    /**
	 * @constructor
	 * @param {Router} _router
	 */
	constructor( private _router: Router ) {}

    /**
     * @param {string} url
     * @return {void}
     */
    public navigate( url: string ) {
        this._router.navigate([ url ]);
    }

}