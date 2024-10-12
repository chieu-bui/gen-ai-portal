import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";

import { CustomDecorators } from "./custom-decorator";

@Component({
    standalone: true,
    selector: 'app-mock',
    template: `<ng-container></ng-container>`,
})
class TestHostComponent {

    /**
     * @param {any} val
     * @return {boolean}
     */
    public checkValidNumber( value: any ): boolean {
        return !!CustomDecorators.ValidateNumber( { value } as any);
    }
}

describe( CustomDecorators.name, () => {
    let fixtureTestHost: ComponentFixture<TestHostComponent>;
    let testHostComponent: TestHostComponent;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ TestHostComponent ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixtureTestHost = TestBed.createComponent(TestHostComponent);
        testHostComponent = fixtureTestHost.componentInstance;
    });

    it( "should return false if valid number", () => {
        const res: boolean = testHostComponent.checkValidNumber( 111 );
        expect( res ).toBeFalse();
    } );

    it( "should return true if invalid number", () => {
        const res: boolean = testHostComponent.checkValidNumber( 'aa' );
        expect( res ).toBeTrue();
    } );
} );