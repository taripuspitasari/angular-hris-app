import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { UserProfileComponent } from './pages/auth/user-profile/user-profile.component';
import { authGuard } from './core/auth.guard';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { DepartmentComponent } from './pages/department/department.component';
import { UserComponent } from './pages/user/user.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { HomeComponent } from './pages/home/home.component';
import { LeaveComponent } from './pages/leave/leave.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
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
            path: '',
            component: UserComponent,
          },
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
      {
        path: 'department',
        component: DepartmentComponent,
      },
      {
        path: 'employees',
        component: EmployeeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'leaves',
        component: LeaveComponent,
      },
    ],
  },
];
