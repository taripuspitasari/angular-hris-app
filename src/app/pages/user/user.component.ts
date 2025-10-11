import { Component, inject } from '@angular/core';
import { UpdateStatusUser, User } from '../../interfaces/model/user';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [TitleCasePipe, CommonModule, ModalComponent, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  users: User[] = [];
  isUpdate: boolean = false;
  selectedUser: User | null = null;
  page: number = 1;
  totalPage: number = 1;

  private userService = inject(UserService);
  private notification = inject(NotificationService);

  getPages() {
    const pages = [];
    for (let i = 1; i <= this.totalPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  searchForm = new FormGroup({
    name: new FormControl(''),
    role: new FormControl(''),
  });

  getUsers(params?: any) {
    this.userService.getUsers(params).subscribe({
      next: (response) => {
        this.users = response.data;
        this.page = response.paging.current_page;
        this.totalPage = response.paging.total_page;
      },
      error: (err) => {
        this.notification.show(err.error.errors, 'error', 5000);
      },
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  toggleActive(user: User) {
    this.selectedUser = user;
    this.isUpdate = true;
  }

  update() {
    const payload: UpdateStatusUser = {
      id: this.selectedUser!.id,
      is_active: !this.selectedUser!.is_active,
    };
    this.userService.update(payload).subscribe({
      next: (response) => {
        this.notification.show(response.message, 'success', 3000);
        this.getUsers();
        this.isUpdate = false;
        this.selectedUser = null;
      },
      error: (err) => {
        const validationErrors = err.error.errors;
        if (typeof validationErrors === 'string') {
          this.notification.show(validationErrors, 'error', 5000);
        }
      },
    });
  }

  closeUpdateModal() {
    this.isUpdate = false;
    this.selectedUser = null;
  }

  search() {
    const params = { ...this.searchForm.value, page: 1 };
    this.getUsers(params);
  }

  previous() {
    this.page = this.page - 1;
    this.getUsers({ page: this.page });
  }

  next() {
    this.page = this.page + 1;
    this.getUsers({ page: this.page });
  }

  changePage(value: number) {
    this.page = value;
    this.getUsers({ page: this.page });
  }
}
