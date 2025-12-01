import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeasurementModalComponent } from "./measurement-modal.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MeasurementService } from "../../services/measurement.service";
import { of } from "rxjs";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe('MeasurementModalComponent', () => {
  let component: MeasurementModalComponent;
  let fixture: ComponentFixture<MeasurementModalComponent>;
  let matDialogRef: jasmine.SpyObj<MatDialogRef<MeasurementModalComponent>>;
  let measurementService: jasmine.SpyObj<MeasurementService>;

  beforeEach(async () => {
    matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    measurementService = jasmine.createSpyObj('MeasurementService', ['getTypes', 'addMeasurement']);

    await TestBed.configureTestingModule({
      imports: [MeasurementModalComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MeasurementService, useValue: measurementService },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MeasurementModalComponent);
    component = fixture.componentInstance;

    measurementService.getTypes.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
