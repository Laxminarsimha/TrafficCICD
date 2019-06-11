import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LogoComponent } from './logo.component';
import { ILogoItem } from './logo.component.interface';
import { RouterTestingModule } from '@angular/router/testing';

const logoItems: ILogoItem[] = [
    {
        linkTo: 'https://imaginecommunications.okta.com/app/UserHome',
        logoPath: 'https://ok1static.oktacdn.com/bc/image/fileStoreRecord?id=fs016c0oh75N3xO2E0h8',
        title: 'Domain title',
    },
];

describe('LogoComponent', () => {
    let component: LogoComponent;
    let fixture: ComponentFixture<LogoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LogoComponent],
            imports: [RouterTestingModule.withRoutes([
                { path: '**', component: LogoComponent },
            ])],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LogoComponent);
        component = fixture.componentInstance;
        component.logo = {...logoItems[0]};

        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it(`should has title`, () => {
        const title = fixture.debugElement.query(By.css('img')).nativeElement.title;
        expect(title).toBeTruthy();
    });
    it('should be clicked', () => {
        spyOn(component.clicked, 'emit');
        const logo = fixture.debugElement.nativeElement.querySelector('.logo-item-link');
        logo.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(component.clicked.emit).toHaveBeenCalled();
    });
});
