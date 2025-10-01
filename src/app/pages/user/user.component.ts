import { Component, inject } from '@angular/core';
import { User } from '../../interfaces/model/user';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { EmployeeCreateComponent } from '../../components/employee/employee-create/employee-create.component';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [EmployeeCreateComponent, TitleCasePipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  users: User[] = [];
  isConvert: boolean = false;
  selectedUser: User | null = null;

  private userService = inject(UserService);
  private notification = inject(NotificationService);

  getUsers(params?: any) {
    this.userService.getUsers(params).subscribe({
      next: (response) => {
        this.users = response.data;
        console.log(this.users);
      },
      error: (err) => {
        this.notification.show(err.error.errors, 'error', 5000);
      },
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  openCreateModal(user: User) {
    this.selectedUser = user;
    this.isConvert = true;
  }

  closeCreateModal() {
    this.isConvert = false;
    this.selectedUser = null;
  }
}
