import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgTextareaComponent } from './xg-textarea.component';

describe('XgTextareaComponent', () => {
  let component: XgTextareaComponent;
  let fixture: ComponentFixture<XgTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
