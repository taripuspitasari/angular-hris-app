import { Component, inject } from '@angular/core';
import { Attendance } from '../../interfaces/model/attendance';
import { AttendanceService } from '../../services/attendance.service';
import { NotificationService } from '../../services/notification.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-attendance',
  imports: [DatePipe, CommonModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css',
})
export class AttendanceComponent {
  attendaceHistory: Attendance[] = [];
  page: number = 1;
  totalPage: number = 1;

  getPages() {
    const pages = [];
    for (let i = 1; i <= this.totalPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  private attendance = inject(AttendanceService);
  private notification = inject(NotificationService);

  getAttendanceHistory(params?: any) {
    this.attendance.getAttendanceHistory(params).subscribe({
      next: (response) => {
        this.attendaceHistory = response.data;
        this.page = response.paging.current_page;
        this.totalPage = response.paging.total_page;
      },
      error: (err) => {
        this.notification.show(err.error.errors, 'error', 5000);
      },
    });
  }

  ngOnInit(): void {
    this.getAttendanceHistory();
  }

  previous() {
    this.page = this.page - 1;
    this.getAttendanceHistory({ page: this.page });
  }

  next() {
    this.page = this.page + 1;
    this.getAttendanceHistory({ page: this.page });
  }

  changePage(value: number) {
    this.page = value;
    this.getAttendanceHistory({ page: this.page });
  }
}
