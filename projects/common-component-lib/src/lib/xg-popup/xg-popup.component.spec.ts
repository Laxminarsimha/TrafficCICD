import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgPopupComponent } from './xg-popup.component';

describe('XgPopupComponent', () => {
  let component: XgPopupComponent;
  let fixture: ComponentFixture<XgPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
