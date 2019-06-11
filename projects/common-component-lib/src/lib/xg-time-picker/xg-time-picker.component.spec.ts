import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgTimePickerComponent } from './xg-time-picker.component';

describe('XgTimePickerComponent', () => {
  let component: XgTimePickerComponent;
  let fixture: ComponentFixture<XgTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgTimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
