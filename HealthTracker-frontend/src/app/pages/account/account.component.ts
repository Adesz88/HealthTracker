import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Router, RouterLink } from "@angular/router";
import { NotificationComponent } from "../../shared/components/notification/notification.component";
import { UpdatedUser, User } from "../../shared/models/user";
import { UserService } from "../../shared/services/user.service";
import { MatOption, MatSelect } from "@angular/material/select";
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    RouterLink,
    MatSelect,
    MatOption,
    NgForOf
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit, OnDestroy{
  getDoctorsSubscription?: Subscription;
  getCurrentUserSubscription?: Subscription;
  updateUserSubscription?: Subscription;

  doctors?: User[];

  accountForm = new FormGroup({
    lastName: new FormControl<string>("", Validators.required),
    firstName: new FormControl<string>("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    birthPlace: new FormControl("", Validators.required),
    birthDate: new FormControl<string>("", Validators.required),
    phone: new FormControl<string>("", [Validators.required,
      Validators.pattern("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$")]),
    doctor: new FormControl<string>("", Validators.required)
    //password: new FormControl(""),
    //rePassword: new FormControl("")
  });

  constructor(private router: Router, private notification: NotificationComponent, private userService: UserService) { }

  ngOnInit() {
    //this.accountForm.setValidators(this.mustMatch("password", "rePassword"));
    this.getDoctorsSubscription = this.userService.getDoctors().subscribe({
      next: data => {
       this.doctors = data
      }, error: err => {
        this.notification.showHttpAlert(err);
      }
    });

    this.getCurrentUserSubscription = this.userService.getCurrentUser().subscribe({
      next: data => {
        this.accountForm.patchValue({
          ...data,
          birthDate: new Date(data.birthDate).toLocaleDateString("en-CA"),
          doctor: data.doctorId
        });
      }, error: err => {
        this.notification.showHttpAlert(err);
      }
    });
  }

  ngOnDestroy() {
    this.getDoctorsSubscription?.unsubscribe();
    this.getCurrentUserSubscription?.unsubscribe();
    this.updateUserSubscription?.unsubscribe();
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
    console.log(this.accountForm);
    if (this.accountForm.valid) {
      const user: UpdatedUser = {
        email: this.accountForm.value.email!,
        //password: null,//this.accountForm.value.password!,
        firstName: this.accountForm.value.firstName!,
        lastName: this.accountForm.value.lastName!,
        phone: this.accountForm.value.phone!,
        birthPlace: this.accountForm.value.birthPlace!,
        birthDate: new Date(this.accountForm.value.birthDate!),
        doctorId: this.accountForm.value.doctor!
      };

      this.updateUserSubscription = this.userService.updateCurrentUser(user).subscribe({next: data => {
        this.notification.showNotification("Successfully updated");
      }, error: err => {
        this.notification.showHttpAlert(err);
      }});
    }
  }
}
