import { Routes } from '@angular/router';
import { authGuard } from "./shared/guards/auth.guard";

export const routes: Routes = [
  {
    path: 'main',
    loadComponent: () => import('./pages/main/main.component').then(c => c.MainComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.component').then(c => c.SignupComponent)
  },
  {
    path: '**',
    redirectTo: '/main'
  }
];
