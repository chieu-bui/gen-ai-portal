import { CommonModule } from "@angular/common";
import {
    AfterViewInit, Component, ElementRef,
    EventEmitter, Input, Output,
    ViewChild, ViewEncapsulation,
} from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
    standalone: true,
    selector: 'bc-auto-resize-textarea',
    templateUrl: './bc-auto-resize-textarea.component.html',
    styleUrls: [ './bc-auto-resize-textarea.component.scss' ],
    host: { class: 'bc-auto-resize-textarea' },
    imports: [ CommonModule, ReactiveFormsModule, CdkTextareaAutosize, ],
    encapsulation: ViewEncapsulation.None,
})
export class BCAutoResizeTextarea implements AfterViewInit {

    
    @ViewChild('autoResizeTextarea') autoResizeTextarea: ElementRef;

    @Input() public customBorder: string = '1px solid black';
    @Input() public control: FormControl<string> = new FormControl<string>(undefined);
    @Input() public initRow: number = 1;
    @Input() public maxHeight: number = 120;
    @Input() public bgColor: string = 'inherit';
    @Input() public placeHolder: string = "Send message";

    @Output() public pressEnterEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    get nativeElement(): any { return this.autoResizeTextarea?.nativeElement; }

    /**
     * @Contructor
     */
    ngAfterViewInit(): void {
        this.nativeElement.addEventListener( 'input', () => {
            if ( this.nativeElement.scrollHeight > this.maxHeight ) return;

            this._resize();
        } );

        this.nativeElement.addEventListener( 'keydown', ( event: any ) => {            
            if ( event.keyCode === 13 && !event.shiftKey ) { // only Press Enter key
                event.preventDefault();
                this.pressEnterEvent.emit( true );
                this._resize();
            }
        } )
    }

    /**
     * @return {void}
     */
    private _resize() {
        this.nativeElement.style.height = 'auto';
        this.nativeElement.style.height = this.nativeElement.scrollHeight + 'px';
    }
    
}