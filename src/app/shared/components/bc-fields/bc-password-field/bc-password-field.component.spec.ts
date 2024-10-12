import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BCPasswordFieldComponent } from './bc-password-field.component';

describe(BCPasswordFieldComponent.name, () => {
    let component: BCPasswordFieldComponent;
    let fixture: ComponentFixture<BCPasswordFieldComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BCPasswordFieldComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BCPasswordFieldComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeDefined();
    });

    it('should return correct type / icon', () => {
        component.onClickIcon();
        expect( component.type ).toEqual('text');
        expect( component.icon ).toEqual('ui-ic-watch-off');
    });

    it('should return correct type / icon', () => {
        component.type = 'text';
        component.icon = 'ui-ic-watch-off';

        component.onClickIcon();
        expect( component.type ).toEqual('password');
        expect( component.icon ).toEqual('ui-ic-watch-on');
    });
})