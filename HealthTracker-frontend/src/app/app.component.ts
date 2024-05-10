import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbar } from "@angular/material/toolbar";
import { AuthService } from "./shared/services/auth.service";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbar, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterContentChecked, OnDestroy {
  isLoggedInSubscription?: Subscription;
  logoutSubscription?: Subscription;

  title = "HealthTracker-frontend";
  prevUrl = "";
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.prevUrl = this.router.url;
    this.checkIfLoggedIn();
  }

  ngAfterContentChecked() {
    const url = this.router.url;
    if (this.prevUrl !== url) {
      this.prevUrl = url;
      this.checkIfLoggedIn();
    }
  }

  ngOnDestroy() {
    this.isLoggedInSubscription?.unsubscribe();
    this.logoutSubscription?.unsubscribe();
  }

  checkIfLoggedIn() {
    this.isLoggedInSubscription = this.authService.isLoggedIn().subscribe({next: data => {
        this.isLoggedIn = data;
    }, error: err => {

    }});
  }

  onLogout() {
    this.logoutSubscription = this.authService.logout().subscribe({next: data => {
      this.router.navigateByUrl("/login");
    }, error: err => {

    }});
  }
}
