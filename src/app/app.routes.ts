import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { GuestLayoutComponent } from './components/guest-layout/guest-layout.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { ApplicationsComponent } from './pages/applications/applications.component';

export const routes: Routes = [
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'home', component: HomeComponent },
      // {
      //   path: 'home',
      //   component: JobsComponent,
      // },
    ],
  },
  {
    path: 'dashboard',
    component: DefaultLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'jobs',
        component: JobsComponent,
      },
      {
        path: 'recruitment',
        component: JobsComponent,
      },
      {
        path: 'applications',
        component: ApplicationsComponent,
      },
    ],
  },
];
