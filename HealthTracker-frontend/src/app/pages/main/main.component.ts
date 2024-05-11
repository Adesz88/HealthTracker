import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MeasurementModalComponent } from "../../shared/components/measurement-modal/measurement-modal.component";
import { Subscription } from "rxjs";
import { Measurement } from "../../shared/models/measurement";
import { MeasurementService } from "../../shared/services/measurement.service";
import { NotificationComponent } from "../../shared/components/notification/notification.component";
import { CommonModule } from "@angular/common";

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
    MatCardContent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, OnDestroy{
  userMeasurementsSubscription?: Subscription;

  userMeasurements?: Measurement[];

  constructor(
    public modal: MatDialog,
    private notification: NotificationComponent,
    private measurementService: MeasurementService
  ) { }

  ngOnInit() {
    this.userMeasurementsSubscription = this.measurementService.getUserMeasurements().subscribe({
      next: data => {
        this.userMeasurements = data;
        console.log(this.userMeasurements);
      }, error: err => {
        this.notification.showHttpAlert(err);
      }
    });
  }

  ngOnDestroy() {
    this.userMeasurementsSubscription?.unsubscribe();
  }

  noNew() {
    const modalRef = this.modal.open(MeasurementModalComponent, { width: "800px" });
  }
}
