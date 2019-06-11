import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgInputComponent } from './xg-input.component';

describe('XgInputComponent', () => {
  let component: XgInputComponent;
  let fixture: ComponentFixture<XgInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
