import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgMultiSelectComponent } from './xg-multi-select.component';

describe('XgMultiSelectComponent', () => {
  let component: XgMultiSelectComponent;
  let fixture: ComponentFixture<XgMultiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgMultiSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
