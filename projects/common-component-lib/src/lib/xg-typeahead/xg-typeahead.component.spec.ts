import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgTypeaheadComponent } from './xg-typeahead.component';

describe('XgTypeaheadComponent', () => {
  let component: XgTypeaheadComponent;
  let fixture: ComponentFixture<XgTypeaheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgTypeaheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
