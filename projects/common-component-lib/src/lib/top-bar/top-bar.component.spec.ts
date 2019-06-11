import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TopBarNavigationComponent } from '../top-bar-navigation/top-bar-navigation.component';
import { NavigationService } from '../services/navigation/navigation.service';
import { LogoComponent} from '../logo/logo.component';
import { TopBarComponent } from './top-bar.component';

const topBarStyle = { 'height': '45px' };

describe('TopBarComponent', () => {
    let component: TopBarComponent;
    let fixture: ComponentFixture<TopBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TopBarComponent, TopBarNavigationComponent, LogoComponent ],
            imports: [RouterTestingModule.withRoutes([
                { path: '**', component: TopBarComponent },
            ])],
            providers: [NavigationService],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TopBarComponent);
        component = fixture.componentInstance;

        component.styles = topBarStyle;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should has style ', () => {
        const styles = fixture.debugElement.query(By.css('.wrapper')).styles;
        expect(styles).toEqual(topBarStyle);
    });
});
