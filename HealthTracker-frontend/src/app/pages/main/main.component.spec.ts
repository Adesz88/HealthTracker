import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from "./main.component";
import { UserService } from "../../shared/services/user.service";
import { MeasurementService } from "../../shared/services/measurement.service";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let measurementService: jasmine.SpyObj<MeasurementService>;

  beforeEach(async () => {
    userService = jasmine.createSpyObj('UserService', ['getCurrentUser']);
    measurementService = jasmine.createSpyObj('MeasurementService', ['getMeasurements', 'getUserMeasurements', 'deleteUserMeasurement']);

    await TestBed.configureTestingModule({
      imports: [
        MainComponent,
        MatDatepickerModule,
        MatNativeDateModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: MeasurementService, useValue: measurementService },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;

    userService.getCurrentUser.and.returnValue(of({}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
