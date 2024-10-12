import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BCRadioComponent } from './bc-radio.component';
import { BCRadioModule } from '../bc-radio.module';

describe( BCRadioComponent.name, () => {
    let component: BCRadioComponent;
    let fixture: ComponentFixture<BCRadioComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BCRadioModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BCRadioComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeDefined();
    });
} );