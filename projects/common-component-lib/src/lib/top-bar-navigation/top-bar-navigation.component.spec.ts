import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TopBarNavigationComponent } from './top-bar-navigation.component';
import { NavigationService } from '../services/navigation/navigation.service';

describe('TopBarNavigationComponent', () => {
  let component: TopBarNavigationComponent;
  let fixture: ComponentFixture<TopBarNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBarNavigationComponent ],
        imports: [RouterTestingModule.withRoutes([
            { path: '**', component: TopBarNavigationComponent },
        ])],
        providers: [NavigationService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select nav item', () => {
    spyOn(component.selectedItem, 'emit');
    const item = fixture.debugElement.nativeElement.querySelector('.nav-list_item');
    item.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.selectedItem.emit).toHaveBeenCalled();
  });
});
