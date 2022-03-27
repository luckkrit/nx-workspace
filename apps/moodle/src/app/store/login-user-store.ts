import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { MoodleProviderService } from '../services/moodle-provider.service';
import { UserLoginDto } from '../services/model/user-login-dto';
import {
  catchError,
  concatMap,
  delay,
  EMPTY,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Injectable } from '@angular/core';

export interface LoginUserState {
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  error: string;
  isRedirect: boolean;
}

@Injectable()
export class LoginUserStore extends ComponentStore<LoginUserState> {
  readonly isSuccess$ = this.select((state) => state.isSuccess);
  readonly isLoading$ = this.select((state) => state.isLoading);
  readonly isError$ = this.select((state) => state.isError);
  readonly error$ = this.select((state) => state.error);
  readonly status$ = this.select((state) => state);
  readonly isRedirect$ = this.select((state) => state.isRedirect);

  constructor(private moodleProviderService: MoodleProviderService) {
    super({
      isLoading: false,
      error: '',
      isSuccess: false,
      isError: false,
      isRedirect: false,
    });
  }
  readonly redirect = (isRedirect: boolean) => this.patchState({ isRedirect });
  readonly login = this.effect((userLoginDto$: Observable<UserLoginDto>) => {
    return userLoginDto$.pipe(
      switchMap(({ username, password }) => {
        this.patchState({
          isLoading: true,
          error: '',
          isSuccess: false,
          isError: false,
          isRedirect: false,
        });
        return of({ username, password }).pipe(
          switchMap(({ username, password }) =>
            this.moodleProviderService.login(username, password).pipe(
              tapResponse(
                (isSuccess) => {
                  this.patchState({
                    isLoading: false,
                    isSuccess,
                    isError: false,
                    error: '',
                    isRedirect: false,
                  });
                },
                (error: Error) => {
                  this.patchState({
                    isLoading: false,
                    isError: true,
                    error: error.message,
                    isSuccess: false,
                    isRedirect: false,
                  });
                }
              )
            )
          )
        );
      })
    );
  });
}
