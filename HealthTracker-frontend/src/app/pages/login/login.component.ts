import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatInputModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    /*email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)*/
  });

  onSubmit() {}
}
