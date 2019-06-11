import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgColumnListItemComponent } from './xg-column-list-item.component';

describe('XgColumnListItemComponent', () => {
  let component: XgColumnListItemComponent;
  let fixture: ComponentFixture<XgColumnListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgColumnListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgColumnListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
