import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgCopyInstructionComponent } from './xg-copy-instruction.component';

describe('XgCopyInstructionComponent', () => {
  let component: XgCopyInstructionComponent;
  let fixture: ComponentFixture<XgCopyInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgCopyInstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgCopyInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
