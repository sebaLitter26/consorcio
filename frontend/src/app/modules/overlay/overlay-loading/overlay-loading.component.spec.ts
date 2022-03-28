import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { OverlayLoadingComponent } from './overlay-loading.component';

describe('OverlayLoadingComponent', () => {
    let component: OverlayLoadingComponent;
    let fixture: ComponentFixture<OverlayLoadingComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule ],
            declarations: [ OverlayLoadingComponent ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OverlayLoadingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
