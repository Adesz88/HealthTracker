import { Component, OnDestroy } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule} from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { Router, RouterLink } from "@angular/router";
import { UserToLogin } from "../../shared/models/user";
import { Subscription } from "rxjs";
import { AuthService } from "../../shared/services/auth.service";
import { NotificationComponent } from "../../shared/components/notification/notification.component";

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

  constructor(private router: Router, private notification: NotificationComponent, private authService: AuthService) { }

  ngOnDestroy() {
    this.loginSubscription?.unsubscribe();
  }

  onSubmit() {
    console.log(this.loginForm)
    if (this.loginForm.valid) {
      const user: UserToLogin = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      };

      this.loginSubscription = this.authService.login(user).subscribe({
        next: data => {
          this.router.navigateByUrl("/main");
        }, error: err => {
          this.notification.showHttpAlert(err);
        }
      });
    }
  }
}
