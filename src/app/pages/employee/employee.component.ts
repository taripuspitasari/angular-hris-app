import { Component, inject } from '@angular/core';
import {
  CreateEmployee,
  Employee,
  UpdateEmployee,
} from '../../interfaces/model/employee';
import { EmployeeService } from '../../services/employee.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { EmployeeEditComponent } from '../../components/employee/employee-edit/employee-edit.component';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Department } from '../../interfaces/model/department';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-employee',
  imports: [
    ReactiveFormsModule,
    EmployeeEditComponent,
    DatePipe,
    TitleCasePipe,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {
  employees: Employee[] = [];
  departments: Department[] = [];
  isEdit: boolean = false;
  selectedEmployee: Employee | null = null;

  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);
  private notification = inject(NotificationService);

  searchForm = new FormGroup({
    name: new FormControl(''),
    status: new FormControl(''),
    department_id: new FormControl(0),
  });

  getEmployees(params?: any) {
    this.employeeService.getEmployees(params).subscribe({
      next: (response) => {
        this.employees = response.data;
      },
      error: (err) => {
        console.log(err.error.errors);
      },
    });
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (response) => {
        this.departments = response.data;
      },
      error: (err) => {
        console.log(err.error.errors);
      },
    });
  }

  ngOnInit(): void {
    this.getEmployees();
    this.getDepartments();
  }

  search() {
    const params = this.searchForm.value;
    this.getEmployees(params);
  }

  openEditModal(employee: Employee) {
    this.selectedEmployee = employee;
    this.isEdit = true;
  }

  closeEditModal() {
    this.isEdit = false;
    this.selectedEmployee = null;
  }
}
