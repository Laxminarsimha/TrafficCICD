import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparationsettingsComponent } from './separationsettings.component';

describe('SeparationsettingsComponent', () => {
  let component: SeparationsettingsComponent;
  let fixture: ComponentFixture<SeparationsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeparationsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparationsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
