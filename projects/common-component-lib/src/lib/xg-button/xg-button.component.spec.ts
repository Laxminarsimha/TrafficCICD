import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgButtonComponent } from './xg-button.component';

describe('XgButtonComponent', () => {
  let component: XgButtonComponent;
  let fixture: ComponentFixture<XgButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
