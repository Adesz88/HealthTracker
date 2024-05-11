import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import { Subscription } from "rxjs";
import { MeasurementType } from "../../models/measurement-type";
import { MeasurementService } from "../../services/measurement.service";
import { NotificationComponent } from "../notification/notification.component";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatOption, MatSelect, MatSelectChange } from "@angular/material/select";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatInput } from "@angular/material/input";
import { NewMeasurement } from "../../models/measurement";

@Component({
  selector: 'app-measurement-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatFormField,
    MatLabel,
    MatSelect,
    ReactiveFormsModule,
    MatOption,
    MatInput
  ],
  templateUrl: './measurement-modal.component.html',
  styleUrl: './measurement-modal.component.scss'
})
export class MeasurementModalComponent implements OnInit, OnDestroy{
  typesSubscription?: Subscription;
  addMeasurementSubscription?: Subscription;

  types?: MeasurementType[];
  selectedType?: MeasurementType;

  measurementForm = new FormGroup({
    type: new FormControl<MeasurementType | null>(null, Validators.required),
    values: new FormArray([new FormControl()], Validators.required),
    comment: new FormControl<string>("")
  });

  constructor(
    public dialogRef: MatDialogRef<MeasurementModalComponent>,
    private notification: NotificationComponent,
    private measurementService: MeasurementService
  ) {

  }

  ngOnInit() {
    this.typesSubscription = this.measurementService.getTypes().subscribe({
      next: data => {
        this.types = data;
        console.log(this.types);
      }, error: err => {
        this.notification.showHttpAlert(err);
      }
    });
  }

  ngOnDestroy() {
    this.typesSubscription?.unsubscribe();
    this.addMeasurementSubscription?.unsubscribe();
  }

  initializeValuesForm(numberOfValues: number) {
    this.measurementForm.controls.values.clear();
    for (let i = 0; i < numberOfValues; i++) {
      this.measurementForm.controls.values.push(new FormControl<number | null>(null, Validators.required));
    }
  }

  onSelect(event: MatSelectChange) {
    console.log(event);
    this.selectedType = event.value;
    this.initializeValuesForm(this.selectedType!.values.length);
  }

  onSave() {
    if (this.measurementForm.valid) {
      const measurement: NewMeasurement = {
        type: this.measurementForm.value.type?._id!,
        date: new Date(),
        values: this.measurementForm.value.values!,
        comment: this.measurementForm.value.comment!
      }

      this.addMeasurementSubscription = this.measurementService.addMeasurement(measurement).subscribe({
        next: data => {
          this.notification.showNotification("Measurement added successfully");
        }, error: err => {
          this.notification.showHttpAlert(err);
        }
      });
    }
  }
}
