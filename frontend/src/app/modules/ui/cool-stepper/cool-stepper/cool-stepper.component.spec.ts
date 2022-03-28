import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolStepperComponent } from './cool-stepper.component';

describe('CoolStepperComponent', () => {
  let component: CoolStepperComponent;
  let fixture: ComponentFixture<CoolStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoolStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoolStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
