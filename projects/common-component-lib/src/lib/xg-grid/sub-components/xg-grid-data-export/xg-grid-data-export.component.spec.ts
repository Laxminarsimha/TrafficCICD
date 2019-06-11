import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgGridDataExportComponent } from './xg-grid-data-export.component';

describe('XgGridDataExportComponent', () => {
  let component: XgGridDataExportComponent;
  let fixture: ComponentFixture<XgGridDataExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgGridDataExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgGridDataExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
