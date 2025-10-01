import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../../interfaces/model/employee';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-item',
  imports: [DatePipe],
  templateUrl: './employee-item.component.html',
  styleUrl: './employee-item.component.css',
})
export class EmployeeItemComponent {
  @Input() employee!: Employee;
  @Output() edit = new EventEmitter();
}
