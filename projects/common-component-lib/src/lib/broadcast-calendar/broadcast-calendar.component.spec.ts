import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastCalendarComponent } from './broadcast-calendar.component';

describe('BroadcastCalendarComponent', () => {
  let component: BroadcastCalendarComponent;
  let fixture: ComponentFixture<BroadcastCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BroadcastCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
