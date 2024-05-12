import { Component, Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: "root" })
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html'
})
export class NotificationComponent {
  constructor(private snackBar: MatSnackBar) { }

  showHttpAlert(err: any) {
    console.log(err.error);
    if (err.error) {
      this.snackBar.open(`Error: ${err.error}`, "OK", {duration: 3000});
    } else {
      this.snackBar.open("Error during the request.", "OK", {duration: 3000});
    }
  }

  showNotification(message: string) {
    this.snackBar.open(message, "OK", {duration: 3000});
  }
}
