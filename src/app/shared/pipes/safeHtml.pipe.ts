import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import _ from 'lodash';

@Pipe({ name: "safeHtml", standalone: true })
export class SafeHtmlPipe implements PipeTransform {

    /**
     * @constructor
     * @param {DomSanitizer} _sanitizer
     */
    constructor( private _sanitizer: DomSanitizer ) {}

    /**
     * @param {text} value
     * @return {SafeHtml}
     */
    transform( text: string ): SafeHtml {
        return this._sanitizer.bypassSecurityTrustHtml( text );
    }
}