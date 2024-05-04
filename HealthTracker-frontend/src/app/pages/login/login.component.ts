import { Component, OnDestroy } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { Router, RouterLink } from "@angular/router";
import { UserToLogin } from "../../shared/models/user";
import { Subscription } from "rxjs";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatInputModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{
  loginSubscription?: Subscription;

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  });

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnDestroy() {
    this.loginSubscription?.unsubscribe();
  }

  onSubmit() {
    console.log(this.loginForm.value)
    if (this.loginForm.status === "VALID") {
      const user: UserToLogin = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      }

      this.loginSubscription = this.authService.login(user).subscribe({next: data => {
        this.router.navigateByUrl("/main");
      }, error: err => {
          console.log(err);
      }});
    }
  }
}
