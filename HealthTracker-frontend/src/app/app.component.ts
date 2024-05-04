import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatToolbar} from "@angular/material/toolbar";
import { AuthService } from "./shared/services/auth.service";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
  isLoggedInSubscription?: Subscription;
  logoutSubscription?: Subscription;

  title = 'HealthTracker-frontend';
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.isLoggedInSubscription = this.authService.isLoggedIn().subscribe({next: data => {
      this.isLoggedIn = data;
    }, error: err => {

    }});
  }

  ngOnDestroy() {
    this.isLoggedInSubscription?.unsubscribe();
    this.logoutSubscription?.unsubscribe();
  }

  onLogout() {
    this.logoutSubscription = this.authService.logout().subscribe({next: data => {
        this.router.navigateByUrl("/login");
      }, error: err => {

      }});
  }
}
