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
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-department',
  imports: [
    RouterModule,
    DepartmentItemComponent,
    ReactiveFormsModule,
    ModalComponent,
  ],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
})
export class DepartmentComponent {
  departments: Department[] = [];
  isDelete: boolean = false;
  selectedDepartment: Department | null = null;
  page: number = 1;
  totalPage: number = 1;

  private departmentService = inject(DepartmentService);
  private notification = inject(NotificationService);
  nameError: string = '';
  descriptionError: string = '';

  getPages() {
    const pages = [];
    for (let i = 1; i <= this.totalPage; i++) {
      pages.push(i);
    }
    return pages;
  }

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
        this.page = response.paging.current_page;
        this.totalPage = response.paging.total_page;
      },
      error: (err) => {
        this.notification.show(err.error.errors, 'error', 5000);
      },
    });
  }

  ngOnInit(): void {
    this.getDepartments();
  }

  search() {
    const params = { ...this.searchForm.value, page: 1 };
    this.getDepartments(params);
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

  delete() {
    if (!this.selectedDepartment) return;

    this.departmentService.delete(this.selectedDepartment.id).subscribe({
      next: (response) => {
        this.notification.show(response.message, 'success', 3000);
        this.getDepartments();
        this.createForm.reset();
        this.closeDeleteModal();
      },
      error: (err) => {
        const validationErrors = err.error.errors;
        if (typeof validationErrors === 'string') {
          this.notification.show(validationErrors, 'error', 5000);
        }
      },
    });
  }

  openDeleteModal(department: Department) {
    this.selectedDepartment = department;
    this.isDelete = true;
  }

  closeDeleteModal() {
    this.isDelete = false;
    this.selectedDepartment = null;
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

  previous() {
    this.page = this.page - 1;
    this.getDepartments({ page: this.page });
  }

  next() {
    this.page = this.page + 1;
    this.getDepartments({ page: this.page });
  }

  changePage(value: number) {
    this.page = value;
    this.getDepartments({ page: this.page });
  }
}
