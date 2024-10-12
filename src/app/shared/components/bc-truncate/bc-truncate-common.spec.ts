import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { Component, AfterViewChecked } from "@angular/core";

import { BCTruncateCommon } from './bc-truncate-common';

@Component({
    standalone: true,
    selector: 'app-mock',
})
class MockComponent extends BCTruncateCommon implements AfterViewChecked {

    public whenReady: Promise<boolean>;

    /**
     * @return {void}
     */
    public validTruncate() {
        this.eleRef = { nativeElement: { offsetWidth: 10, scrollWidth: 20 } };
        this._checkTruncate();
    }

    /**
     * @return {void}
     */
    public invalidTruncate() {
        this.eleRef = { nativeElement: { offsetWidth: 20, scrollWidth: 10 } };
        this._checkTruncate();
    }

    /**
     * @return {void}
     */
    private _checkTruncate() {
        this.checkTooltip();
        this.whenReady = new Promise( ( resolve ) => setTimeout(() => resolve( this.isTruncate ), 200 ));
    }
}

describe(BCTruncateCommon.name, () => {
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

    it('should create mock component', fakeAsync( () => {
        expect(mockComponent).toBeDefined();
    }) );

    it('should isTruncate = true', async () => {
        mockComponent.validTruncate();
        await mockComponent.whenReady;
        expect(mockComponent.isTruncate).toBeTrue();
    });

    it('should isTruncate = false', async () => {
        mockComponent.invalidTruncate();
        await mockComponent.whenReady;
        expect(mockComponent.isTruncate).toBeFalsy();
    });

    it('should do nothing when offsetWidth has null', () => {
        mockComponent.ngAfterViewChecked();
        expect(mockComponent?.nativeElement?.offsetWidth).toBeFalsy();
    });

});