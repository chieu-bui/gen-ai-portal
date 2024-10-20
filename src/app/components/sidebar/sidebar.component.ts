import { CommonModule } from "@angular/common";
import {
    Component, EventEmitter, Input,
    OnInit, Output,
} from "@angular/core";
import { Router } from "@angular/router";

import { Unsubscriber, untilCmpDestroyed } from "@shared/decorator";
import { ChatListComponent } from "@components/chat/chat-list/chat-list.component";
import { IChat, IChatItem } from "@components/chat/interfaces/chat.interface";
import { TokenService } from "@components/main/services/token.service";
import { IUser, UserService } from "@components/main/services/user.service";
import { BCAvatarComponent } from "@shared/components/bc-avatar/bc-avatar.component";
import { BCButtonComponent } from "@shared/components/bc-button/bc-button.component";
import { BCDropdownModule } from "@shared/components/bc-dropdown/bc-dropdown.module";
import { BCTruncateComponent } from "@shared/components/bc-truncate/bc-truncate.component";

@Unsubscriber()
@Component({
    standalone: true,
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: [ './sidebar.component.scss' ],
    imports: [
        CommonModule, ChatListComponent, BCDropdownModule,
        BCAvatarComponent, BCTruncateComponent, BCButtonComponent,
    ],
})
export class SidebarComponent implements OnInit {
    
    @Input() public chatList: IChatItem[];
    @Input() public activeChatId: string;

    @Output() public closed: EventEmitter<void> = new EventEmitter<void>();
    @Output() public selectedChatIdEvent: EventEmitter<string> = new EventEmitter<string>();
    @Output() public createChatEvent: EventEmitter<void> = new EventEmitter<void>();
    @Output() public deleteEvent: EventEmitter<string> = new EventEmitter<string>();
    @Output() public updateEvent: EventEmitter<{ chat: IChat, id: string }> = new EventEmitter<{ chat: IChat, id: string }>();

    public user: IUser;

    /**
	 * @constructor
	 * @param {Router} _router
     * @param {TokenService} _tokenService
     * @param {UserService} _userService
	 */
	constructor(
        private _router: Router,
        private _tokenService: TokenService,
        private _userService: UserService
    ) {}

    /**
     * @constructor
     */
    ngOnInit(): void {
        this._userService.user$
        .pipe( untilCmpDestroyed( this ) )
        .subscribe( ( user: IUser ) => this.user = user );
    }

    /**
     * @return {void}
     */
    public signOut() {
        localStorage.removeItem( 'genAIToken' );
        this._tokenService.invalidToken$.next();
    }

    /**
     * @param {string} url
     * @return {void}
     */
    public navigate( url: string ) {
        this._router.navigate([ url ]);
    }

}