import {
    Component, ContentChild, EventEmitter,
    HostBinding, HostListener, Input,
    Output, TemplateRef, ViewEncapsulation,
    booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type IType = 'error' | 'warning' | 'success' | 'infor';
export type IBannerType = 'top' | 'bottom' | 'none';

@Component({
    selector: 'bc-notification',
    standalone: true,
    templateUrl: './bc-notification.component.html',
    styleUrls: [ './bc-notification.component.scss' ],
    host: { class: 'bc-notification' },
    imports: [ CommonModule ],
    encapsulation: ViewEncapsulation.None,
})
export class BCNotificationComponent {

    @ContentChild('leftSide') public leftSide: TemplateRef<any>;
    @ContentChild('rightSide') public rightSide: TemplateRef<any>;

    @Input({ transform: booleanAttribute }) public showCloseBtn: boolean;
    @Input() public bannerState: IBannerType = 'none';
    @Input() public state: IType = 'infor';
    
    @Output() public close: EventEmitter<void> = new EventEmitter<void>();

    @HostBinding('class.bc-notification__infor')
    get infor(): boolean {
        return this.state === 'infor';
    }

    @HostBinding('class.bc-notification__error')
    get error(): boolean {
        return this.state === 'error';
    }

    @HostBinding('class.bc-notification__warning')
    get warning(): boolean {
        return this.state === 'warning';
    }

    @HostBinding('class.bc-notification__success')
    get success(): boolean {
        return this.state === 'success';
    }

    @HostBinding('class.bc-notification__banner--top')
    get bannerTop(): boolean {
        return this.bannerState === 'top';
    }

    @HostBinding('class.bc-notification__banner--bottom')
    get bannerBottom(): boolean {
        return this.bannerState === 'bottom';
    }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler() {
        this.close.emit();
    }

}