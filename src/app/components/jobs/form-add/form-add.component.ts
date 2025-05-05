import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Job as JobModel } from '../../../types/models/job';
import { Job as JobRequest } from '../../../types/request/job';

@Component({
  selector: 'app-form-add',
  imports: [ReactiveFormsModule],
  templateUrl: './form-add.component.html',
  styleUrl: './form-add.component.css',
})
export class FormAddComponent {
  private fb = inject(FormBuilder);
  @Input() jobToEdit?: JobModel;

  @Output() jobUpdated = new EventEmitter<JobRequest>();
  @Output() jobAdded = new EventEmitter<JobRequest>();
  @Output() close = new EventEmitter<void>();

  newJobForm: FormGroup;

  constructor() {
    this.newJobForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]],
      job_type: ['', [Validators.required]],
      workplace_type: ['', [Validators.required]],
      experience_level: ['', [Validators.required]],
      location: [''],
      salary_range: [''],
      expiry_date: [''],
    });
  }

  ngOnInit() {
    if (this.jobToEdit) {
      this.newJobForm.patchValue(this.jobToEdit);
    }
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.newJobForm.invalid) return;

    const formatattedDate = new Date(
      this.newJobForm.value.expiry_date
    ).toISOString();

    if (this.jobToEdit) {
      const data = {
        ...this.jobToEdit,
        ...this.newJobForm.value,
        expiry_date: formatattedDate,
      };
      this.jobUpdated.emit(data);
    } else {
      const data = { ...this.newJobForm.value, expiry_date: formatattedDate };
      this.jobAdded.emit(data);
    }
  }

  isInvalid(controlName: string) {
    const control = this.newJobForm.get(controlName);
    return control?.invalid && (control.dirty || control.touched);
  }
}
