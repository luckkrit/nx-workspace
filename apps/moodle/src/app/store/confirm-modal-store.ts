import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { MoodleProviderService } from '../services/moodle-provider.service';

export interface ConfirmModalState {
  isShow: boolean;
  isConfirm: boolean;
  isCancel: boolean;
  title: string;
  body: string;
  cancelText: string;
  confirmText: string;
}

@Injectable()
export class ConfirmModalStore extends ComponentStore<ConfirmModalState> {
  confirmText$ = this.select(({ confirmText }) => confirmText);
  cancelText$ = this.select(({ cancelText }) => cancelText);
  isShow$ = this.select(({ isShow }) => isShow);
  isConfirm$ = this.select(({ isConfirm }) => isConfirm);
  isCancel$ = this.select(({ isCancel }) => isCancel);
  body$ = this.select(({ body }) => body);
  title$ = this.select(({ title }) => title);
  constructor(private moodleProviderService: MoodleProviderService) {
    super({
      isShow: false,
      isConfirm: false,
      isCancel: false,
      title: '',
      body: '',
      cancelText: '',
      confirmText: '',
    });
  }
  readonly showModal = ({
    title,
    body,
    cancelText,
    confirmText,
  }: Partial<ConfirmModalState>) =>
    this.patchState({
      isShow: true,
      isCancel: false,
      isConfirm: false,
      title,
      body,
      cancelText,
      confirmText,
    });
  readonly confirm = () =>
    this.patchState({ isShow: false, isCancel: false, isConfirm: true });

  readonly cancel = () =>
    this.patchState({ isShow: false, isCancel: true, isConfirm: false });

  readonly close = () =>
    this.patchState({ isShow: false, isCancel: false, isConfirm: false });
}
