import { Component } from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatCard,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
