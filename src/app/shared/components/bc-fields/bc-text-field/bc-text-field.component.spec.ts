import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BCTextFieldComponent } from "./bc-text-field.component";

describe(BCTextFieldComponent.name, () => {
    let component: BCTextFieldComponent;
    let fixture: ComponentFixture<BCTextFieldComponent>;

    beforeEach( async () => {
        await TestBed.configureTestingModule({
            imports: [ BCTextFieldComponent ],
        }).compileComponents();
    } )

    beforeEach(() => {
        fixture = TestBed.createComponent(BCTextFieldComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeDefined();
    });
})