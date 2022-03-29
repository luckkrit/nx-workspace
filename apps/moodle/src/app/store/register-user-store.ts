import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { MoodleProviderService } from '../services/moodle-provider.service';
import { CreateUserDto } from '../services/model/create-user-dto';
import {
  catchError,
  concatMap,
  delay,
  EMPTY,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { toErrorString } from '../util/error-converter';

export interface RegisterUserState {
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  error: string;
  timeOut: number;
}

@Injectable()
export class RegisterUserStore extends ComponentStore<RegisterUserState> {
  readonly isSuccess$ = this.select(({ isSuccess }) => isSuccess);
  readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  readonly isError$ = this.select(({ isError }) => isError);
  readonly error$ = this.select(({ error }) => error);

  constructor(private moodleProviderService: MoodleProviderService) {
    super({
      isSuccess: false,
      isLoading: false,
      error: '',
      isError: false,
      timeOut: 5000,
    });
  }

  readonly register = this.effect((createUserDto$: Observable<CreateUserDto>) =>
    createUserDto$.pipe(
      switchMap(({ username, password, firstname, lastname, email }) => {
        this.patchState({
          isError: false,
          isSuccess: false,
          isLoading: true,
          error: '',
        });
        return of({ username, password, firstname, lastname, email }).pipe(
          switchMap((state) => {
            return this.moodleProviderService
              .registerUser(
                state.username,
                state.password,
                state.firstname,
                state.lastname,
                state.email
              )
              .pipe(
                tapResponse(
                  () => {
                    this.patchState({
                      isSuccess: true,
                      isLoading: false,
                      isError: false,
                      error: '',
                    });
                  },
                  (error: Error | string) => {
                    this.patchState({
                      isLoading: false,
                      isSuccess: false,
                      error: toErrorString(error),
                      isError: true,
                    });
                  }
                )
              );
          })
        );
      })
    )
  );
}
