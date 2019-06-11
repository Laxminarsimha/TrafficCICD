import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgDatePickerComponent } from './xg-date-picker.component';

describe('XgDatePickerComponent', () => {
  let component: XgDatePickerComponent;
  let fixture: ComponentFixture<XgDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
