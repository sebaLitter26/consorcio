import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolInputComponent } from './cool-input.component';

describe('CoolInputComponent', () => {
  let component: CoolInputComponent;
  let fixture: ComponentFixture<CoolInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoolInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoolInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
