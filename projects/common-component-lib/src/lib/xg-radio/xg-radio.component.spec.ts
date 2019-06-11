import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgRadioComponent } from './xg-radio.component';

describe('XgRadioComponent', () => {
  let component: XgRadioComponent;
  let fixture: ComponentFixture<XgRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
