import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../../../interfaces/model/user';
import { CreateEmployee } from '../../../interfaces/model/employee';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Department } from '../../../interfaces/model/department';
import { DepartmentService } from '../../../services/department.service';
import { NotificationService } from '../../../services/notification.service';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-create',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.css',
})
export class EmployeeCreateComponent {
  @Input() user: User | null = null;
  @Output() cancel = new EventEmitter();
  @Output() refresh = new EventEmitter();

  departments: Department[] = [];
  private departmentService = inject(DepartmentService);
  private notification = inject(NotificationService);
  private employeeService = inject(EmployeeService);

  departmentIdError: string = '';
  statusError: string = '';
  positionError: string = '';
  joinDateError: string = '';
  userIdError: string = '';

  createForm = new FormGroup({
    user_id: new FormControl(0),
    department_id: new FormControl(0),
    position: new FormControl(''),
    join_date: new FormControl(''),
    status: new FormControl(''),
  });

  getDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (response) => {
        this.departments = response.data;
        console.log(this.departments);
      },
      error: (err) => {
        this.notification.show(err.error.errors, 'error', 5000);
      },
    });
  }

  ngOnInit() {
    if (this.user) {
      this.createForm.patchValue({
        user_id: this.user.id,
      });
    }
    this.getDepartments();
  }

  create() {
    this.employeeService
      .create(this.createForm.value as CreateEmployee)
      .subscribe({
        next: (response) => {
          this.notification.show(response.message, 'success', 3000);
          this.createForm.reset();
          this.refresh.emit();
          this.cancel.emit();
        },
        error: (err) => {
          this.departmentIdError = '';
          this.statusError = '';
          this.positionError = '';
          this.joinDateError = '';
          this.userIdError = '';

          const validationErrors = err.error.errors;
          if (Array.isArray(validationErrors)) {
            validationErrors.forEach((errorItem: any) => {
              if (errorItem.path?.[0] === 'user_id') {
                this.userIdError = errorItem.message;
              }
              if (errorItem.path?.[0] === 'position') {
                this.positionError = errorItem.message;
              }
              if (errorItem.path?.[0] === 'department_id') {
                this.departmentIdError = errorItem.message;
              }
              if (errorItem.path?.[0] === 'join_date') {
                this.joinDateError = errorItem.message;
              }
              if (errorItem.path?.[0] === 'status') {
                this.statusError = errorItem.message;
              }
            });
          }
          if (typeof validationErrors === 'string') {
            this.notification.show(validationErrors, 'error', 5000);
          }
        },
      });
  }
}
