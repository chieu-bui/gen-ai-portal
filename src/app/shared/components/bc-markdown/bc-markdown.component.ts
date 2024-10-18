import { CommonModule } from "@angular/common";
import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import highlightJs from 'highlight.js';

marked.use(markedHighlight({ highlight: highlightCodeBlock }));

function markdownToHtml(content: string): any {
    return marked(content );
  };

function highlightCodeBlock(code: string, language: string | undefined) {
    if ( !language ) return code;
    
    return highlightJs.highlight(code, { language } ).value;
}


@Component({
    standalone: true,
    selector: 'bc-markdown',
    styleUrls: [ './bc-markdown.component.scss' ],
    template: '<ng-container></ng-container>',
    imports: [ CommonModule ],
})
export class BCMarkDownComponent implements OnInit {

    @Input() public src: string;

    public textContent: string;

    /**
     * @constructor
     * @param {ElementRef} _elementRef
     */
    constructor( private _elementRef: ElementRef ) {}

    /**
     * @constructor
     */
    ngOnInit(): void {
        this._updateDocument( markdownToHtml( this.src ) as string );
    }

    /**
     * @param {string} rawHTML
     * @return {Observable}
     */
    private _updateDocument( rawHTML: string ) {
        this._elementRef.nativeElement.innerHTML = rawHTML;
        this.textContent = this._elementRef.nativeElement.textContent;
        highlightJs.highlightAll();
      }

}

