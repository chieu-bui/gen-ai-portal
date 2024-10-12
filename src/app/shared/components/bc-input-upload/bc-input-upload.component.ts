import {
    Component, EventEmitter, Input,
    Output, ViewEncapsulation,
    booleanAttribute,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import _ from 'lodash';

import { BCButtonComponent } from "../bc-button/bc-button.component";

@Component({
    standalone: true,
    selector: 'bc-input-upload',
    templateUrl: './bc-input-upload.component.html',
    styleUrl: './bc-input-upload.component.scss',
    imports: [ BCButtonComponent, CommonModule ],
    host: { class: 'bc-input-upload' },
    encapsulation: ViewEncapsulation.None,
})
export class BCInputUploadComponent  {

    @Input() public accept: string;
    @Input() public label: string = "Choose File";
    @Input({ transform: booleanAttribute }) public disabled: boolean;

    @Output() public fileChange: EventEmitter<File> = new EventEmitter<File>();

    public file: File;

    /**
     * @param {any} event
     * @return {void}
     */
    public onChange( event: any ) {
        this.fileChange.emit( this.file = event.target.files[0] );
    }

    /**
     * @param {MouseEvent} event
     * @return {void}
     */
    public resetUploadedDocuments( event: MouseEvent ) {
        (event.target as HTMLInputElement).value = null;
    }

}