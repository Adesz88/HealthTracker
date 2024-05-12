import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MeasurementModalComponent } from "../../shared/components/measurement-modal/measurement-modal.component";
import { Subscription } from "rxjs";
import { Measurement, UserMeasurement } from "../../shared/models/measurement";
import { MeasurementService } from "../../shared/services/measurement.service";
import { NotificationComponent } from "../../shared/components/notification/notification.component";
import { CommonModule } from "@angular/common";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import { User } from "../../shared/models/user";
import { UserService } from "../../shared/services/user.service";
import { ROLES } from "../../shared/constants";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, OnDestroy{
  getCurrentUserSubscription?: Subscription;
  userMeasurementsSubscription?: Subscription;
  measurementsSubscription?: Subscription;
  modalCloseSubscription?: Subscription;

  user?: User
  userMeasurements?: UserMeasurement[];
  measurements?: Measurement[];

  filterForm = new FormGroup({
    date: new FormControl<Date>(new Date(), Validators.required),
  });

  constructor(
    public modal: MatDialog,
    private notification: NotificationComponent,
    private userService: UserService,
    private measurementService: MeasurementService,
  ) { }

  ngOnInit() {
    this.getCurrentUserSubscription = this.userService.getCurrentUser().subscribe({
      next: data => {
        this.user = data;
        this.getMeasurements(new Date());
      }, error: err => {
        this.notification.showHttpAlert(err);
      }
    });
  }

  ngOnDestroy() {
    this.getCurrentUserSubscription?.unsubscribe();
    this.userMeasurementsSubscription?.unsubscribe();
    this.measurementsSubscription?.unsubscribe();
    this.modalCloseSubscription?.unsubscribe();
  }

  getMeasurements(date: Date) {
    if (this.user?.role === ROLES.DOCTOR) {
      this.measurementsSubscription = this.measurementService.getMeasurements(date).subscribe({
        next: data => {
          this.measurements = data;
          console.log(this.measurements);
        }, error: err => {
          this.notification.showHttpAlert(err);
        }
      });
    } else{
      this.userMeasurementsSubscription = this.measurementService.getUserMeasurements(date).subscribe({
        next: data => {
          this.userMeasurements = data;
          console.log(this.userMeasurements);
        }, error: err => {
          this.notification.showHttpAlert(err);
        }
      });
    }
  }

  refreshMeasurements() {
    if (this.filterForm.valid) {
      this.getMeasurements(this.filterForm.value.date!);
    } else {
      this.getMeasurements(new Date());
    }
  }

  onNew() {
    const modalRef = this.modal.open(MeasurementModalComponent, { width: "800px" });
    this.modalCloseSubscription = modalRef.afterClosed().subscribe(res => {
      if (res) {
        this.refreshMeasurements();
      }
    });
  }

  onDateChange(event: any) {
    if (this.filterForm.valid) {
      this.getMeasurements(this.filterForm.value.date!);
    }
  }

  onDelete(id: string) {
    this.measurementService.deleteUserMeasurement(id).subscribe({
      next: data => {
        this.notification.showNotification("Measurement deleted successfully");

        this.refreshMeasurements();
      }, error: err => {
        this.notification.showHttpAlert(err);
      }
    });
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US");
  }

  formatTime(date: string) {
    return new Date(date).toLocaleTimeString("en-US", {hour: '2-digit', minute:'2-digit'});
  }

  protected readonly ROLES = ROLES;
}
