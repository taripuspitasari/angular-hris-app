import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Employee, UpdateEmployee } from '../../../interfaces/model/employee';
import { Department } from '../../../interfaces/model/department';
import { DepartmentService } from '../../../services/department.service';
import { NotificationService } from '../../../services/notification.service';
import { EmployeeService } from '../../../services/employee.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css',
})
export class EmployeeEditComponent {
  @Input() employee: Employee | null = null;
  @Output() cancel = new EventEmitter();
  @Output() refresh = new EventEmitter();

  departments: Department[] = [];
  private departmentService = inject(DepartmentService);
  private notification = inject(NotificationService);
  private employeeService = inject(EmployeeService);

  private formatDate(date: string | Date | null): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  departmentIdError: string = '';
  statusError: string = '';
  positionError: string = '';
  joinDateError: string = '';
  idError: string = '';

  editForm = new FormGroup({
    id: new FormControl(0),
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
    if (this.employee) {
      this.editForm.patchValue({
        id: this.employee.id,
        department_id: this.employee.department.id,
        position: this.employee.position,
        join_date: this.formatDate(this.employee.join_date),
        status: this.employee.status,
      });
    }
    this.getDepartments();
  }

  update() {
    this.employeeService
      .update(this.editForm.value as UpdateEmployee)
      .subscribe({
        next: (response) => {
          this.notification.show(response.message, 'success', 3000);
          this.refresh.emit();
          this.cancel.emit();
        },
        error: (err) => {
          this.departmentIdError = '';
          this.statusError = '';
          this.positionError = '';
          this.joinDateError = '';
          this.idError = '';

          const validationErrors = err.error.errors;
          if (Array.isArray(validationErrors)) {
            validationErrors.forEach((errorItem: any) => {
              if (errorItem.path?.[0] === 'id') {
                this.idError = errorItem.message;
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
