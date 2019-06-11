import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgGridDataEditorDialogComponent } from './xg-grid-data-editor-dialog.component';

describe('XgGridDataEditorDialogComponent', () => {
  let component: XgGridDataEditorDialogComponent;
  let fixture: ComponentFixture<XgGridDataEditorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgGridDataEditorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgGridDataEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
