import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import _ from 'lodash';

import { Unsubscriber, untilCmpDestroyed } from "@shared/decorator";
import { IModelAIData, ModelAIService, IModelAI } from "@shared/services/ai-models.service";
import { BCMenuSingleFieldComponent } from "@shared/components/bc-fields/bc-menu-field/bc-menu-single-field/bc-menu-single-field.component";
import { IOption } from "@shared/components/bc-fields/bc-menu-field/bc-menu-field.common";
import { forkJoin } from "rxjs";
import { ChatService } from "@components/chat/services/chat.service";
import { IChatResponse } from "@components/chat/interfaces/chat.interface";

@Unsubscriber()
@Component({
    standalone: true,
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.scss' ],
    imports: [ CommonModule, BCMenuSingleFieldComponent ],
    providers: [ ChatService ],
})
export class HeaderComponent implements OnInit {

    @Input() public chatId: string;

    public modelOptions: IOption[];
    public selectedmodelControl: FormControl = new FormControl('');

    private _modelList: IModelAI[];

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
     * @Constructor
     * @param {ModelAIService} _modelAIService
     */
    ngOnInit(): void {
        forkJoin([
            this._modelAIService.getModelAIList(),
            this._chatService.getById( this.chatId ),
        ])
        .pipe( untilCmpDestroyed( this ) )
        .subscribe( ( [ modeAIData, chatResponse ]: [ IModelAIData, IChatResponse ] ) => {
            this._modelList = modeAIData.data;
            this.modelOptions = _.map( this._modelList, ( modelItem: IModelAI ) => {
                return { value: modelItem.id, label: modelItem.name };
            } );
            
            this.selectedmodelControl.patchValue( chatResponse.chat.models[ 0 ] );

            console.log( this.modelOptions );
            
        } );
    }


}