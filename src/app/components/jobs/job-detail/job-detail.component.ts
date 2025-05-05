import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Job as JobModel } from '../../../types/models/job';
import { DatePipe } from '@angular/common';
import { EnumLabelPipe } from '../../../core/pipes/enum-label.pipe';

@Component({
  selector: 'app-job-detail',
  imports: [DatePipe, EnumLabelPipe],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css',
})
export class JobDetailComponent {
  @Input() JobToShow?: JobModel;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
