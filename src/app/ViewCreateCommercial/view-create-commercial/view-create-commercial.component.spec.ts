import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCreateCommercialComponent } from './view-create-commercial.component';

describe('ViewCreateCommercialComponent', () => {
  let component: ViewCreateCommercialComponent;
  let fixture: ComponentFixture<ViewCreateCommercialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCreateCommercialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCreateCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
