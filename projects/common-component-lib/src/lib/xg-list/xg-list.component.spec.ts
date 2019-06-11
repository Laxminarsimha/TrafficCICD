import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgListComponent } from './xg-list.component';

describe('XgListComponent', () => {
  let component: XgListComponent;
  let fixture: ComponentFixture<XgListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
