import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgBreadcrumbComponent } from './xg-breadcrumb.component';

describe('XgBreadcrumbComponent', () => {
  let component: XgBreadcrumbComponent;
  let fixture: ComponentFixture<XgBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
