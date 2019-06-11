import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgDayPickerComponent } from './xg-day-picker.component';

describe('XgDayPickerComponent', () => {
  let component: XgDayPickerComponent;
  let fixture: ComponentFixture<XgDayPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgDayPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgDayPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
