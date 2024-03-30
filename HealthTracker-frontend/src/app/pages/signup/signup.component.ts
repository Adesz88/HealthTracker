import { Component } from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatInputModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  registerForm = new FormGroup({
    /*email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)*/
  });

  onSubmit() {}
}
