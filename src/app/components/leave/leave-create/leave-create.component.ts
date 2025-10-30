import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LeaveService } from '../../../services/leave.service';
import { CreateLeave } from '../../../interfaces/model/leave';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-leave-create',
  imports: [ReactiveFormsModule],
  templateUrl: './leave-create.component.html',
  styleUrl: './leave-create.component.css',
})
export class LeaveCreateComponent {
  @Output() cancel = new EventEmitter();
  @Output() refresh = new EventEmitter();
  private leaveService = inject(LeaveService);
  private notification = inject(NotificationService);

  createForm = new FormGroup({
    type: new FormControl(''),
    start_date: new FormControl(''),
    end_date: new FormControl(''),
  });

  create() {
    this.leaveService.create(this.createForm.value as CreateLeave).subscribe({
      next: (response) => {
        this.notification.show(response.message, 'success', 3000);
        this.createForm.reset();
        this.refresh.emit();
        this.cancel.emit();
      },
      error: (err) => {
        this.notification.show(err.error.errors, 'error', 3000);
      },
    });
  }
}
