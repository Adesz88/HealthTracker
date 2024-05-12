import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { NewUser } from "../../shared/models/user";
import { Subscription } from "rxjs";
import { AuthService } from "../../shared/services/auth.service";
import { Router, RouterLink } from "@angular/router";
import { NotificationComponent } from "../../shared/components/notification/notification.component";
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatInputModule, ReactiveFormsModule, RouterLink, MatDatepicker, MatDatepickerInput, MatDatepickerToggle],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit, OnDestroy{
  registerSubscription?: Subscription;

  registerForm = new FormGroup({
    lastName: new FormControl<string>("", Validators.required),
    firstName: new FormControl<string>("", Validators.required),
    email: new FormControl<string>("", [Validators.required, Validators.email]),
    birthPlace: new FormControl<string>("", Validators.required),
    birthDate: new FormControl<Date>(new Date(), Validators.required),
    phone: new FormControl<string>("", [Validators.required,
      Validators.pattern("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$")]),
    password: new FormControl<string>("", Validators.required),
    rePassword: new FormControl<string>("", Validators.required)
  });

  constructor(private router: Router, private notification: NotificationComponent,private authService: AuthService) { }

  ngOnInit() {
    this.registerForm.setValidators(this.mustMatch("password", "rePassword"));
  }

  ngOnDestroy() {
    this.registerSubscription?.unsubscribe();
  }

  mustMatch(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup): ValidationErrors => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        matchingControl.setErrors(null);
        return {};
      }
    }
  }

  onSubmit() {
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      const user: NewUser = {
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
        firstName: this.registerForm.value.firstName!,
        lastName: this.registerForm.value.lastName!,
        phone: this.registerForm.value.phone!,
        birthPlace: this.registerForm.value.birthPlace!,
        birthDate: this.registerForm.value.birthDate!,
      };

      this.registerSubscription = this.authService.register(user).subscribe({
        next: data => {
          this.router.navigateByUrl("/login");
          this.notification.showNotification("Successfully signed up");
        }, error: err => {
          this.notification.showHttpAlert(err);
        }
      });
    }
  }
}
