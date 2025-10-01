import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() title: string = '';
  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();
}
