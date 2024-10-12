import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BCDividerComponent } from "./bc-divider.component";

describe(BCDividerComponent.name, () => {
    let component: BCDividerComponent;
    let fixture: ComponentFixture<BCDividerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BCDividerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BCDividerComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeDefined();
    });

    it('should vertical is true and horizontal is false', () => {
        component.vertical = true;
        expect(component.getVertical).toBeTrue();
        expect(component.getHorizontal).toBeFalse();
    });

    it('should vertical is false and horizontal is true', () => {
        component.vertical = false;
        expect(component.getVertical).toBeFalse();
        expect(component.getHorizontal).toBeTrue();
    });

    it('should thickness is 1px', () => {
        expect(component.getThickness).toEqual('1px');
    });

    it('should thickness is 2px', () => {
        component.thickness = '2px';
        expect(component.getThickness).toEqual('2px');
    });

    it('should color is var(--bosch-gray-75)', () => {
        expect(component.getColor).toEqual('var(--bosch-gray-75)');
    });

    it('should color is var(--bosch-black)', () => {
        component.color = 'var(--bosch-black)';
        expect(component.getColor).toEqual('var(--bosch-black)');
    });

})