import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from "@angular/core";
import { By } from '@angular/platform-browser';

import { BCTruncateComponent } from "./bc-truncate.component";
import { ITooltipPostion } from "../bc-tooltip/constant";

@Component({
    standalone: true,
    selector: 'app-mock',
    template: `<bc-truncate [position]="position">{{ content }}</bc-truncate>`,
    imports: [BCTruncateComponent],
})
class MockComponent {
    public position: ITooltipPostion;
    public content: string;
}

describe(BCTruncateComponent.name, () => {
    let mockFixture: ComponentFixture<MockComponent>;
    let mockComponent: MockComponent;
    let bcTruncateComponent: BCTruncateComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BCTruncateComponent, MockComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        mockFixture = TestBed.createComponent(MockComponent);
        mockComponent = mockFixture.componentInstance;
        bcTruncateComponent = mockFixture.debugElement.query(
            By.directive(BCTruncateComponent)
        ).componentInstance;
    });

    it('should create the component', () => {
        mockComponent.position = 'top';
        mockComponent.content = 'Testing for truncate text';
        mockFixture.detectChanges();
        expect(bcTruncateComponent).toBeDefined();
        expect(bcTruncateComponent.content).toBeDefined();
    });
    
});