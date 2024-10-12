import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import _ from 'lodash';

import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { HeaderComponent } from '@components/header/header.component';

@Component({
    standalone: true,
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: [ './main.component.scss' ],
    imports: [ CommonModule, SidebarComponent, HeaderComponent ],
})
export class MainComponent {
    
    public chatId: string;

}