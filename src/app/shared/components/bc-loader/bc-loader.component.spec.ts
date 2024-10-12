import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BCLoaderComponent } from "./bc-loader.component";

describe(BCLoaderComponent.name, () => {
    let component: BCLoaderComponent;
    let fixture: ComponentFixture<BCLoaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BCLoaderComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BCLoaderComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeDefined();
    });

    it('should color return var(--bosch-blue)', () => {
        expect(component.getColor).toEqual('var(--bosch-blue)');
    });

    it('should color return var(--bosch-black)', () => {
        component.color = 'var(--bosch-black)';
        expect(component.getColor).toEqual('var(--bosch-black)');
    });

    it('should size is small', () => {
        component.size = 'small';
        expect(component.small).toBeTrue();
    });

    it('should size is medium', () => {
        component.size = 'medium';
        expect(component.medium).toBeTrue();
    });

    it('should size is large', () => {
        component.size = 'large';
        expect(component.large).toBeTrue();
    });
});