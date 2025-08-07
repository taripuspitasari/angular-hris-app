import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { authGuard } from './core/auth.guard';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { DepartmentComponent } from './pages/department/department.component';
import { DepartmentCreateComponent } from './components/department/department-create/department-create.component';
import { DepartmentEditComponent } from './components/department/department-edit/department-edit.component';
import { DepartmentDetailComponent } from './components/department/department-detail/department-detail.component';

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
      {
        path: 'department',
        component: DepartmentComponent,
        children: [
          {
            path: 'create',
            component: DepartmentCreateComponent,
          },
          {
            path: 'edit',
            component: DepartmentEditComponent,
          },
          {
            path: 'detail',
            component: DepartmentDetailComponent,
          },
        ],
      },
    ],
  },
];
