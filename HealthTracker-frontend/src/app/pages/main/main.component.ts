import { Component } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MeasurementModalComponent } from "../../shared/components/measurement-modal/measurement-modal.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatCard,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(public modal: MatDialog) { }

  noNew() {
    const modalRef = this.modal.open(MeasurementModalComponent, { width: "800px" });
  }
}
