import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgTabComponent } from './xg-tab.component';

describe('XgTabComponent', () => {
  let component: XgTabComponent;
  let fixture: ComponentFixture<XgTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
