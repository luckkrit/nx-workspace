import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { MoodleProviderService } from '../services/moodle-provider.service';

export interface NavbarState {
  isLogin: boolean;
  isShow: boolean;
  isLogout: boolean;
}
@Injectable()
export class NavbarStore extends ComponentStore<NavbarState> {
  isShow$ = this.select(({ isShow }) => isShow);
  isLogin$ = this.select(({ isLogin }) => isLogin);
  isLogout$ = this.select(({ isLogout }) => isLogout);
  constructor(private moodleProviderService: MoodleProviderService) {
    super({ isLogin: false, isShow: false, isLogout: false });
  }
  readonly checkLogin = () =>
    this.effect(() => {
      return this.moodleProviderService.getToken().pipe(
        tapResponse(
          (token) => {
            this.patchState({ isLogin: true, isShow: true });
          },
          (error: string | Error) => {
            this.patchState({ isLogin: false, isShow: false });
          }
        )
      );
    });
  readonly logout = () => {
    this.moodleProviderService.logout();
    this.patchState({ isLogout: true, isLogin: false, isShow: false });
  };
}
