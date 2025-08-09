import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Department,
  UpdateDepartment,
} from '../../../interfaces/model/department';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-department-item',
  imports: [ReactiveFormsModule],
  templateUrl: './department-item.component.html',
  styleUrl: './department-item.component.css',
})
export class DepartmentItemComponent {
  editable: boolean = false;

  emailError: string = '';
  passwordError: string = '';

  @Input() department!: Department;
  @Output() remove = new EventEmitter<Department>();
  @Output() updated = new EventEmitter<UpdateDepartment>();

  editForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    description: new FormControl(''),
  });

  ngOnInit() {
    this.editForm.patchValue({
      id: this.department.id,
      name: this.department.name,
      description: this.department.description,
    });
  }

  update() {
    if (this.editForm.valid) {
      this.updated.emit(this.editForm.value as UpdateDepartment);
      this.editable = false;
    }
  }

  toggleEdit() {
    this.editable = !this.editable;
  }
}
