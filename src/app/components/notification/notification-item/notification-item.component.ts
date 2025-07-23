import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-notification-item',
  imports: [CommonModule],
  templateUrl: './notification-item.component.html',
  styleUrl: './notification-item.component.css',
})
export class NotificationItemComponent implements OnInit, OnDestroy {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';
  @Input() duration: number = 3000;
  @Output() closeNotification = new EventEmitter<void>();

  private timer: any;

  ngOnInit(): void {
    if (this.duration > 0) {
      this.timer = setTimeout(() => {
        this.close();
      }, this.duration);
    }
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  close() {
    this.closeNotification.emit();
  }
}
