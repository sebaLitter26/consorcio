import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectionChipsComponent } from './selection-chips.component';

describe('SelectionChipsComponent', () => {
  let component: SelectionChipsComponent;
  let fixture: ComponentFixture<SelectionChipsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
