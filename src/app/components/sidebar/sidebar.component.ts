import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";

import { ChatListComponent } from "@components/chat/chat-list/chat-list.component";

@Component({
    standalone: true,
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: [ './sidebar.component.scss' ],
    imports: [ CommonModule, ChatListComponent ],
})
export class SidebarComponent {
    
    @Output() public selectedChatIdEvent: EventEmitter<string> = new EventEmitter<string>();

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

    /**
     * @param {string} id
     * @return {void}
     */
    public onSelectedChat( id: string ) {
        this.selectedChatIdEvent.emit( id );
    }

}