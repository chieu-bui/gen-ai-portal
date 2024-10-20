import {
    Component, EventEmitter, Input,
    OnChanges, Output, SimpleChanges,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import _ from 'lodash';

import { BCTruncateComponent } from "@shared/components/bc-truncate/bc-truncate.component";
import { BCSearchBoxComponent } from "@shared/components/bc-fields/bc-search-box/bc-search-box.component";
import { BCButtonComponent } from "@shared/components/bc-button/bc-button.component";
import { BCDropdownModule } from "@shared/components/bc-dropdown/bc-dropdown.module";
import { IChat, IChatItem } from "../interfaces/chat.interface";
import { BCTextFieldComponent } from "@shared/components/bc-fields/bc-text-field/bc-text-field.component";
import { FormControl } from "@angular/forms";

interface IChatItemExtra extends IChatItem {
    isEdit?: boolean;
}
@Component({
    standalone: true,
    selector: 'chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: [ './chat-list.component.scss' ],
    imports: [
        CommonModule, BCTruncateComponent, BCSearchBoxComponent,
        BCButtonComponent, BCDropdownModule, BCTextFieldComponent,
    ]
})
export class ChatListComponent implements OnChanges {

    @Input() public chatList: IChatItem[];
    @Input() public activeChatId: string;

    @Output() public selectedChatIdEvent: EventEmitter<string> = new EventEmitter<string>();
    @Output() public createChatEvent: EventEmitter<void> = new EventEmitter<void>();
    @Output() public deleteEvent: EventEmitter<string> = new EventEmitter<string>();
    @Output() public updateEvent: EventEmitter<{ chat: IChat, id: string }> = new EventEmitter<{ chat: IChat, id: string }>();

    public dspChatlist: IChatItemExtra[];
    public editNameControl: FormControl<string>;

    /**
     * @constructor
     * @param {SimpleChanges} changes
     */
    ngOnChanges( changes: SimpleChanges ): void {
        if ( changes.chatList ) {
            this.onSearch();
        }
    }

    /**
     * @return {void}
     * @param {string} id
     */
    public delete( id: string ) {
        this.deleteEvent.emit( id );
    }

    /**
     * @return {void}
     * @param {string} id
     */
    public rename( id: string ) {
        const findChat: IChatItemExtra = _.find( this.dspChatlist, ( item: IChatItem ) => item.id === id );
        findChat.isEdit = true;
        this.editNameControl = new FormControl<string>( findChat.title );
    }

    /**
     * @return {void}
     */
    public saveRename() {
        const findChat: IChatItemExtra = _.find( this.dspChatlist, ( item: IChatItemExtra ) => item.isEdit );
        this.updateEvent.emit({
            id: findChat.id,
            chat: { title: this.editNameControl.getRawValue() },
        });
        this.editNameControl = undefined;
        findChat.isEdit = false;
    }

    /**
     * @return {void}
     */
    public cancelRename() {
        const findChat: IChatItemExtra = _.find( this.dspChatlist, ( item: IChatItemExtra ) => item.isEdit );
        findChat.isEdit = false;
        this.editNameControl = undefined;
    }

    /**
     * @return {void}
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
        if ( id === this.activeChatId ) return;

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