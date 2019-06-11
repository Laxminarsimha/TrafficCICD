import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgInputsComponent } from './xg-inputs.component';

describe('XgInputsComponent', () => {
  let component: XgInputsComponent;
  let fixture: ComponentFixture<XgInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
