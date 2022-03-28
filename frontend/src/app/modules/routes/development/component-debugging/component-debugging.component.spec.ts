import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDebuggingComponent } from './component-debugging.component';

describe('ComponentDebuggingComponent', () => {
  let component: ComponentDebuggingComponent;
  let fixture: ComponentFixture<ComponentDebuggingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentDebuggingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentDebuggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
