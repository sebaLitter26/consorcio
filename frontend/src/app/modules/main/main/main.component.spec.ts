import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { DeviceService } from 'src/app/modules/ui/device/services/device.service';
import { LogsService } from 'src/app/services/logs.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { SandboxService } from 'src/app/services/sandbox.service';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;
    const toggleSourceStub_: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    const navbarServiceSpy = jasmine.createSpyObj('NavbarService', [''], {'toggleEvent': toggleSourceStub_.asObservable()});
    const deviceServiceSpy = jasmine.createSpyObj('DeviceService', ['isMobile']);

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ MainComponent ],
            providers: [
                {
                    provide: NavbarService,
                    useValue: navbarServiceSpy,
                },
                {
                    provide: BreakpointObserver,
                    useClass: BreakpointObserver,
                },
                {
                    provide: LogsService,
                    useValue: {},
                },
                {
                    provide: SandboxService,
                    useValue: {},
                },
                {
                    provide: DeviceService,
                    useValue: deviceServiceSpy,
                }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


});
