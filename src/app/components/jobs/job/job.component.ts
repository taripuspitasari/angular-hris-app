import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Job as JobModel } from '../../../types/models/job';
import { EnumLabelPipe } from '../../../core/pipes/enum-label.pipe';

@Component({
  selector: 'app-job',
  imports: [RouterModule, EnumLabelPipe],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css',
})
export class JobComponent {
  @Input() job!: JobModel;
  @Output() remove = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
}
