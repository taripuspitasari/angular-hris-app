import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Leave } from '../../interfaces/model/leave';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { LeaveCreateComponent } from '../../components/leave/leave-create/leave-create.component';
import { LeaveService } from '../../services/leave.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-leave',
  imports: [ReactiveFormsModule, DatePipe, TitleCasePipe, LeaveCreateComponent],
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.css',
})
export class LeaveComponent {
  private leaveService = inject(LeaveService);
  private notification = inject(NotificationService);
  leaves: Leave[] = [];
  isCreate: boolean = false;
  page: number = 1;
  totalPage: number = 1;

  getPages() {
    const pages = [];
    for (let i = 1; i <= this.totalPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  searchForm = new FormGroup({
    status: new FormControl(''),
    type: new FormControl(''),
  });

  getLeaves(params?: any) {
    this.leaveService.getLeaves(params).subscribe({
      next: (response) => {
        this.leaves = response.data;
        this.page = response.paging.current_page;
        this.totalPage = response.paging.total_page;
      },
      error: (err) => {
        this.notification.show(err.error.errors, 'error', 3000);
      },
    });
  }

  ngOnInit(): void {
    this.getLeaves();
  }

  search() {
    const params = { ...this.searchForm.value, page: 1 };
    this.getLeaves(params);
  }

  previous() {
    this.page = this.page - 1;
    this.getLeaves({ page: this.page });
  }

  next() {
    this.page = this.page + 1;
    this.getLeaves({ page: this.page });
  }

  changePage(value: number) {
    this.page = value;
    this.getLeaves({ page: this.page });
  }

  openCreateModal() {
    this.isCreate = true;
  }

  closeCreateModal() {
    this.isCreate = false;
  }
}
