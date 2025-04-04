import { Component, OnInit } from '@angular/core';
import { User as UserModel } from '../../types/models/user';
import { UserService } from '../../services/api/user.service';
import { User as UserInterface } from '../../types/api/user';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-employees',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  users$!: Observable<UserInterface[]>;

  constructor(private userService: UserService) {}

  isLoading: boolean = true;

  ngOnInit(): void {
    this.users$ = this.userService.users$;
    this.userService.getUsers();
  }
}
