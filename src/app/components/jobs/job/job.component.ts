import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Job as JobModel } from '../../../types/models/job';
import { EnumLabelPipe } from '../../../core/pipes/enum-label.pipe';
import { SlicePipe } from '@angular/common';
import { User } from '../../../types/models/user';

@Component({
  selector: 'app-job',
  imports: [RouterModule, EnumLabelPipe, SlicePipe],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css',
})
export class JobComponent {
  @Input() job!: JobModel;
  @Output() remove = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() show = new EventEmitter<void>();

  user = signal<User | null>(null);

  ngOnInit(): void {
    const storedUser = localStorage.getItem('USER');
    if (storedUser) {
      try {
        this.user.set(JSON.parse(storedUser));
      } catch (e) {
        this.user.set(null);
      }
    } else {
      this.user.set(null);
    }
  }
}
