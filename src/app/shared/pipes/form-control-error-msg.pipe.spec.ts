import { Component } from "@angular/core";
import { FormControlErrorMsgPipe } from "./form-control-error-msg.pipe";
import { ComponentFixture, TestBed } from "@angular/core/testing";

@Component({
    standalone: true,
    selector: 'app-mock',
    template: '<ng-container></ng-container>',
    providers: [ FormControlErrorMsgPipe ],
})
class MockComponent {

    /**
     * @constructor
     * @param {FormControlErrorMsgPipe} formControlErrorMsgPipe
     */
    constructor( public formControlErrorMsgPipe: FormControlErrorMsgPipe ) {};

}

describe( FormControlErrorMsgPipe.name, () => {
    let mockFixture: ComponentFixture<MockComponent>;
    let mockComponent: MockComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MockComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        mockFixture = TestBed.createComponent(MockComponent);
        mockComponent = mockFixture.componentInstance;
    });

    it('should create mock component', () => {
        expect(mockComponent).toBeDefined();
    } );

    it('should return empty string', () => {
        const res: string = mockComponent.formControlErrorMsgPipe.transform( null );
        expect( res ).toEqual('');
    } );

    it('should return string', () => {
        const res: string = mockComponent.formControlErrorMsgPipe.transform( { required: true } );
        expect( res ).toBeTruthy();
    } );

} );