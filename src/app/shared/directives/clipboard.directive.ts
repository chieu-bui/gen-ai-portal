import { Directive, ElementRef, Input, NgZone } from '@angular/core';
import { Unsubscriber, untilCmpDestroyed } from '@shared/decorator';
import { fromEvent, switchMap } from 'rxjs';

@Unsubscriber()
@Directive({ standalone: true, selector: '[copyClipboard]' })
export class CopyClipBoardDirective {

    @Input() public copyClipboard: string;

  /**
   * @param {ElementRef} host
   * @param {NgZone} zone
   */
    constructor( private host: ElementRef<HTMLElement>, private zone: NgZone ) {}

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
        fromEvent(this.host.nativeElement, 'click').pipe(
            switchMap(() => navigator.clipboard.writeText(this.copyClipboard)),
            untilCmpDestroyed(this)
        ).subscribe()
    })
  }
}