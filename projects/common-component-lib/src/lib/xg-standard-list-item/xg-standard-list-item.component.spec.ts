import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgStandardListItemComponent } from './xg-standard-list-item.component';

describe('XgStandardListItemComponent', () => {
  let component: XgStandardListItemComponent;
  let fixture: ComponentFixture<XgStandardListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgStandardListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgStandardListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
