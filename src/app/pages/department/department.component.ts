import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DepartmentItemComponent } from '../../components/department/department-item/department-item.component';
import { DepartmentService } from '../../services/department.service';
import { NotificationService } from '../../services/notification.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CreateDepartment,
  Department,
  UpdateDepartment,
} from '../../interfaces/model/department';

@Component({
  selector: 'app-department',
  imports: [RouterModule, DepartmentItemComponent, ReactiveFormsModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
})
export class DepartmentComponent {
  departments: Department[] = [];

  private departmentService = inject(DepartmentService);
  private notification = inject(NotificationService);
  nameError: string = '';
  descriptionError: string = '';

  createForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  searchForm = new FormGroup({
    name: new FormControl(''),
  });

  getDepartments(params?: any) {
    this.departmentService.getDepartments(params).subscribe({
      next: (response) => {
        this.departments = response.data;
      },
      error: (err) => {
        this.notification.show(err.error.errrors, 'error', 5000);
      },
    });
  }

  ngOnInit(): void {
    this.getDepartments();
  }

  search() {
    this.getDepartments(
      this.searchForm.value.name?.trim()
        ? { name: this.searchForm.value.name }
        : {}
    );
  }
  create() {
    this.departmentService
      .create(this.createForm.value as CreateDepartment)
      .subscribe({
        next: (response) => {
          this.notification.show(response.message, 'success', 3000);
          this.getDepartments();
          this.createForm.reset();
        },
        error: (err) => {
          this.nameError = '';
          this.descriptionError = '';

          const validationErrors = err.error.errors;
          if (Array.isArray(validationErrors)) {
            validationErrors.forEach((errorItem: any) => {
              if (errorItem.path?.[0] === 'name') {
                this.nameError = errorItem.message;
              }
              if (errorItem.path?.[0] === 'description') {
                this.descriptionError = errorItem.message;
              }
            });
          }
          if (typeof validationErrors === 'string') {
            this.notification.show(validationErrors, 'error', 5000);
          }
        },
      });
  }

  delete(department: Department) {
    this.departmentService.delete(department.id).subscribe({
      next: (response) => {
        this.notification.show(response.message, 'success', 3000);
        this.getDepartments();
        this.createForm.reset();
      },
      error: (err) => {
        const validationErrors = err.error.errors;
        if (typeof validationErrors === 'string') {
          this.notification.show(validationErrors, 'error', 5000);
        }
      },
    });
  }

  update(department: UpdateDepartment) {
    this.departmentService.update(department).subscribe({
      next: (response) => {
        this.notification.show(response.message, 'success', 3000);
        this.getDepartments();
      },
      error: (err) => {
        const validationErrors = err.error.errors;
        if (typeof validationErrors === 'string') {
          this.notification.show(validationErrors, 'error', 5000);
        }
      },
    });
  }

  cancel() {
    this.nameError = '';
    this.descriptionError = '';
    this.createForm.reset();
  }
}
