import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { authGuard } from './core/auth.guard';
import { AttendanceComponent } from './pages/attendance/attendance.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'users',
        children: [
          {
            path: 'profile',
            component: UserProfileComponent,
          },
        ],
      },
      {
        path: 'attendance',
        component: AttendanceComponent,
      },
    ],
  },
];
