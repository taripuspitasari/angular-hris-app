import { Component, inject } from '@angular/core';
import { User } from '../../interfaces/model/user';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  users: User[] = [];

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

  getUserSatu() {
    this.userService.getUserById(1).subscribe({
      next: (response) => {
        console.log(response.data);
      },
      error: (err) => {
        this.notification.show(err.error.errors, 'error', 5000);
      },
    });
  }

  ngOnInit(): void {
    this.getUsers();
    this.getUserSatu();
  }
}
