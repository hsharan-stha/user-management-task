import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent implements OnInit{
  isVisible = false;
  headerTitle = 'Confirm Action';
  bodyMessage = 'Are you sure you want to proceed?';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  show(header: string, message: string): void {
    this.headerTitle = header;
    this.bodyMessage = message;
    this.isVisible = true;
  }

  hide(): void {
    this.isVisible = false;
  }

  onConfirm(): void {
    this.confirm.emit();
    this.hide();
  }

  onCancel(): void {
    this.cancel.emit();
    this.hide();
  }

  ngOnInit(): void {
  }
}
