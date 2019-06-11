import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyInstructionsStepper  } from 'src/app/copyinstructionsstepper/copyinstructionsstepper.component'

describe('CopyInstructionsStepper', () => {
  let component: CopyInstructionsStepper;
  let fixture: ComponentFixture<CopyInstructionsStepper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyInstructionsStepper ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyInstructionsStepper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
