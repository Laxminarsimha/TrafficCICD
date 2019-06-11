import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgInputSwitchComponent } from './xg-input-switch.component';

describe('XgInputSwitchComponent', () => {
  let component: XgInputSwitchComponent;
  let fixture: ComponentFixture<XgInputSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgInputSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgInputSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
