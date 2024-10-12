import { Component } from "@angular/core";
import { IncludesPipe } from "./includes.pipe";
import { ComponentFixture, TestBed } from "@angular/core/testing";

@Component({
    standalone: true,
    selector: 'app-mock',
    template: '<ng-container></ng-container>',
    providers: [ IncludesPipe ],
})
class MockComponent {

    /**
     * @constructor
     * @param {IncludesPipe} includesPipe
     */
    constructor( public includesPipe: IncludesPipe ) {};

}

describe( IncludesPipe.name, () => {
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

    it('should return true', () => {
        const res: boolean = mockComponent.includesPipe.transform( 1, [ 1, 2 ] );
        expect( res ).toBeTrue();
    } );

    it('should return false', () => {
        const res: boolean = mockComponent.includesPipe.transform( 3, [ 1, 2 ] );
        expect( res ).toBeFalse();
    } );
} );