import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-job',
  imports: [RouterModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css',
})
export class JobComponent {
  @Input() job!: any;
  @Output() remove = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
}
