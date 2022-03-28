import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolCardComponent } from './cool-card.component';

describe('CoolCardComponent', () => {
  let component: CoolCardComponent;
  let fixture: ComponentFixture<CoolCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoolCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoolCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
