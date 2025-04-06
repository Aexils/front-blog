import { Routes } from '@angular/router';
import {AuthGuard} from './guards/auth';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./components/post/post-list.component').then(m => m.PostListComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'code',
    loadComponent: () => import('./components/auth/code.component').then(m => m.CodeComponent)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then((m) => m.DashboardComponent)
  }
];
