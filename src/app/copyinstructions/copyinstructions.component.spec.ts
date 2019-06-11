import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyInstructionsComponent } from './copyinstructions.component';

describe('CopyInstructionsComponent', () => {
  let component: CopyInstructionsComponent;
  let fixture: ComponentFixture<CopyInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
