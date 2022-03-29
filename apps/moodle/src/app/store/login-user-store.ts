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
import { toErrorString } from '../util/error-converter';

export interface LoginUserState {
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  error: string;
  isRedirect: boolean;
}

@Injectable()
export class LoginUserStore extends ComponentStore<LoginUserState> {
  readonly isSuccess$ = this.select(({ isSuccess }) => isSuccess);
  readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  readonly isError$ = this.select(({ isError }) => isError);
  readonly error$ = this.select(({ error }) => error);
  readonly isRedirect$ = this.select(({ isRedirect }) => isRedirect);

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
                (error: string | Error) => {
                  this.patchState({
                    isLoading: false,
                    isError: true,
                    error: toErrorString(error),
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
