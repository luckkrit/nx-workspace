import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmModalStore } from '../store/confirm-modal-store';

@Component({
  selector: 'nx-workspace-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent implements OnInit {
  confirmText$ = this.confirmModalStore.confirmText$;
  cancelText$ = this.confirmModalStore.cancelText$;
  body$ = this.confirmModalStore.body$;
  title$ = this.confirmModalStore.title$;
  isShow$ = this.confirmModalStore.isShow$;
  @Output() onModalClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onModalCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onModalConfirm: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private confirmModalStore: ConfirmModalStore) {}

  ngOnInit(): void {}
  onClose(): void {
    this.confirmModalStore.close();
    this.onModalClose.emit(true);
  }
  onCancel(): void {
    this.onModalCancel.emit(true);
    this.confirmModalStore.cancel();
  }
  onConfirm(): void {
    this.onModalConfirm.emit(true);
    this.confirmModalStore.confirm();
  }
}
