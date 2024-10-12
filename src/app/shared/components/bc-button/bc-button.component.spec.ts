import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BCButtonComponent } from "./bc-button.component";

describe(BCButtonComponent.name, () => {
    let component: BCButtonComponent;
    let fixture: ComponentFixture<BCButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BCButtonComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BCButtonComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeDefined();
    });

    it('should set fit-width if no input', () => {
        expect(component.getWidth).toEqual('fit-content');
    });

    it('should set max-width: 100% if no input', () => {
        expect(component.getMaxWidth).toEqual('100%');
    });

    it('should isDisabled is true when loading true', () => {
        component.loading = true;
        expect(component.isDisabledPrimary).toBeTrue();
        expect(component.isDisabledSecondary).toBeTrue();
        expect(component.isDisabledIntegrated).toBeTrue();
        expect(component.isDisabledTertiary).toBeTrue();
    });

    it('should isDisabledPrimary is true when disabled is true', () => {
        component.loading = false;
        component.disabled = true;
        component.type = 'primary';
        expect(component.isDisabledPrimary).toBeTrue();
    });

    it('should isDisabledSecondary is true when disabled is true', () => {
        component.loading = false;
        component.disabled = true;
        component.type = 'secondary';
        expect(component.isDisabledSecondary).toBeTrue();
    });

    it('should isDisabledTertiary is true when disabled is true', () => {
        component.loading = false;
        component.disabled = true;
        component.type = 'tertiary';
        expect(component.isDisabledTertiary).toBeTrue();
    });

    it('should isDisabledIntegrated is true when disabled is true', () => {
        component.loading = false;
        component.disabled = true;
        component.type = 'integrated';
        expect(component.isDisabledIntegrated).toBeTrue();
    });

    it('should isPrimary is true', () => {
        component.type = 'primary';
        expect(component.isPrimary).toBeTrue();
    });

    it('should isSecondary is true', () => {
        component.type = 'secondary';
        expect(component.isSecondary).toBeTrue();
    });

    it('should isTertiary is true', () => {
        component.type = 'tertiary';
        expect(component.isTertiary).toBeTrue();
    });

    it('should isIntegrated is true', () => {
        component.type = 'integrated';
        expect(component.isIntegrated).toBeTrue();
    });

    it('should onClick event emit', () => {
        const spy = spyOn(component.onClick, 'emit');
        component.onHandleClickEvent();
        expect(spy).toHaveBeenCalled();
    });

    it("should icon is empty string", () => {
        component.icon = '';
        expect(component.icon).toBe('');
    });

    it("should icon is a-icon a-icon-search", () => {
        component.icon = 'a-icon-search';
        expect(component.icon).toBe('a-icon a-icon-search');
    });

});