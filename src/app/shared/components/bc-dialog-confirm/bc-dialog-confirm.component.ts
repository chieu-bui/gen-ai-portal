import { Component, Inject, Optional, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BCButtonComponent } from "../bc-button/bc-button.component";

export interface IConfirmData {
    content?: string;
    hint?: string;
    yesBtn?: string;
    noBtn?: string;
}

@Component({
    standalone: true,
    selector: 'bc-dialog-confirm',
    templateUrl: './bc-dialog-confirm.component.html',
    styleUrls: [ './bc-dialog-confirm.component.scss' ],
    host: { class: 'bc-dialog-confirm' },
    imports: [ FormsModule, BCButtonComponent ],
    encapsulation: ViewEncapsulation.None,
})
export class BCDialogConfirmComponent {

    /**
   * @constructor
   * @param {MatDialogRef} _dialogRef 
   * @param {Object} data 
   */
  constructor(
    private _dialogRef: MatDialogRef<BCDialogConfirmComponent>,
    @Optional() @Inject( MAT_DIALOG_DATA ) public data: IConfirmData,
  ) {}

    /**
    * @rconstuctor
    */
    ngOnDestroy(): void {
        this.close(); 
    }

    /**
     * @return {void}
     */
    public close(): void {
        this._dialogRef.close(); 
    }

    /**
     * @param {boolean=} answer
     * @return {void}
     */
    public onClick( answer?: boolean ) {
        this._dialogRef.close( answer );
    }

}