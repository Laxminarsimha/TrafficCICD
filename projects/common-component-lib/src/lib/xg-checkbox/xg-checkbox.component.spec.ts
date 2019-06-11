import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgCheckboxComponent } from './xg-checkbox.component';

describe('XgCheckboxComponent', () => {
  let component: XgCheckboxComponent;
  let fixture: ComponentFixture<XgCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
