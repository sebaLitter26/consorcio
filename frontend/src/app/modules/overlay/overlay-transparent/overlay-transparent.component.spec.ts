import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OverlayTransparentComponent } from './overlay-transparent.component';

describe('OverlayTransparentComponent', () => {
  let component: OverlayTransparentComponent;
  let fixture: ComponentFixture<OverlayTransparentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayTransparentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayTransparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
