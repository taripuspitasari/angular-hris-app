import { Component, inject } from '@angular/core';
import { Attendance } from '../../interfaces/model/attendance';
import { AttendanceService } from '../../services/attendance.service';
import { NotificationService } from '../../services/notification.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [DatePipe, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  attendanceToday: Attendance | null = null;
  todayDate: string = '';

  private attendance = inject(AttendanceService);
  private notification = inject(NotificationService);

  getAttendanceToday() {
    this.attendance.getAttendance().subscribe({
      next: (response) => {
        this.attendanceToday = response.data ?? null;
      },
      error: (err) => {
        this.notification.show(err.error.errors, 'error', 5000);
      },
    });
  }

  ngOnInit(): void {
    this.todayDate = new Date().toISOString();
    this.getAttendanceToday();
  }

  get attendanceStatus(): string {
    if (!this.attendanceToday) return "You haven't checked in.";
    if (!this.attendanceToday.check_out_time)
      return "You haven't checked out yet.";
    return 'You have completed attendance.';
  }

  checkIn() {
    this.attendance.checkIn().subscribe({
      next: (response) => {
        this.attendanceToday = response.data ?? null;
        this.notification.show(response.message, 'success', 3000);
      },
      error: (err) => {
        this.notification.show(err.error.errors, 'error', 5000);
      },
    });
  }

  checkOut() {
    this.attendance.checkOut().subscribe({
      next: (response) => {
        this.attendanceToday = response.data ?? null;
        this.notification.show(response.message, 'success', 3000);
      },
      error: (err) => {
        this.notification.show(err.error.errors, 'error', 5000);
      },
    });
  }
}
