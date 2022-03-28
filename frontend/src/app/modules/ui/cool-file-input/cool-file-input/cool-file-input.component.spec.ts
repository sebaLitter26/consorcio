import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolFileInputComponent } from './cool-file-input.component';

describe('CoolFileInputComponent', () => {
  let component: CoolFileInputComponent;
  let fixture: ComponentFixture<CoolFileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoolFileInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoolFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
