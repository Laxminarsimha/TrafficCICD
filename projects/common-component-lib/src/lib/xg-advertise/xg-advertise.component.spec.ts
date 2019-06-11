import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgAdvertiseComponent } from './xg-advertise.component';

describe('XgAdvertiseComponent', () => {
  let component: XgAdvertiseComponent;
  let fixture: ComponentFixture<XgAdvertiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgAdvertiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgAdvertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
