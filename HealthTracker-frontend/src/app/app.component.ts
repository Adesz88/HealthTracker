import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbar } from "@angular/material/toolbar";
import { AuthService } from "./shared/services/auth.service";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { User } from "./shared/models/user";
import { UserService } from "./shared/services/user.service";
import { ROLES } from "./shared/constants";
import { NotificationService } from "./shared/services/notification.service";
import { Notification } from "./shared/models/Notification";
import { NotificationComponent } from "./shared/components/notification/notification.component";
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbar, RouterLink, MatMenuTrigger, MatMenu, MatButton, MatMenuItem, MatIconButton, MatIcon, MatDivider],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterContentChecked, OnDestroy {
  currentUserSubscription?: Subscription;
  notificationSubscription?: Subscription;
  notificationDeleteSubscription?: Subscription;
  logoutSubscription?: Subscription;

  title = "HealthTracker-frontend";
  prevUrl = "";
  user?: User;
  notifications?: Notification[];

  constructor(
    private router: Router,
    private notification: NotificationComponent,
    private authService: AuthService,
    private userService: UserService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.prevUrl = this.router.url;
    this.getUser();
  }

  ngAfterContentChecked() {
    const url = this.router.url;
    if (this.prevUrl !== url) {
      this.prevUrl = url;
      this.getUser();
    }
  }

  ngOnDestroy() {
    this.currentUserSubscription?.unsubscribe();
    this.logoutSubscription?.unsubscribe();
    this.notificationSubscription?.unsubscribe();
    this.notificationDeleteSubscription?.unsubscribe();
  }

  getNotifications() {
    if (this.user) {
      this.notificationSubscription = this.notificationService.getNotifications().subscribe({
        next: data => {
          this.notifications = data;
        }, error: err => {
          this.notification.showHttpAlert(err);
        }
      });
    }
  }

  getUser() {
    this.currentUserSubscription = this.userService.getCurrentUser().subscribe({
      next: data => {
        this.user = data;
        this.getNotifications();
      }, error: err => {
        this.notification.showHttpAlert(err);
      }
    });
  }

  deleteNotifications() {
    this.notificationDeleteSubscription = this.notificationService.deleteNotifications().subscribe({
      next: data => {
        this.notifications = [];
        this.notification.showNotification("Notifications successfully deleted");
      }, error: err => {
        this.notification.showHttpAlert(err);
      }
    });
  }

  onLogout() {
    this.logoutSubscription = this.authService.logout().subscribe({next: data => {
      this.router.navigateByUrl("/login");
    }, error: err => {
        this.notification.showHttpAlert(err);
    }});
  }

  formatDate(date: string) {
    return new Date(date).toLocaleString("en-US");
  }

  protected readonly ROLES = ROLES;
}
