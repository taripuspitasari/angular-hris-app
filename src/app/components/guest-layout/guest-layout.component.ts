import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-guest-layout',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './guest-layout.component.html',
  styleUrl: './guest-layout.component.css',
})
export class GuestLayoutComponent {}
