import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgDropdownComponent } from './xg-dropdown.component';

describe('XgDropdownComponent', () => {
  let component: XgDropdownComponent;
  let fixture: ComponentFixture<XgDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
