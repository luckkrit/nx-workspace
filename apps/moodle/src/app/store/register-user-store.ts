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

export interface RegisterUserState {
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  error: string;
  timeOut: number;
}

@Injectable()
export class RegisterUserStore extends ComponentStore<RegisterUserState> {
  readonly isSuccess$ = this.select((state) => state.isSuccess);
  readonly isLoading$ = this.select((state) => state.isLoading);
  readonly isError$ = this.select((state) => state.isError);
  readonly error$ = this.select((state) => state.error);
  readonly status$ = this.select((state) => state);

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
                  (error: Error) => {
                    this.patchState({
                      isLoading: false,
                      isSuccess: false,
                      error: error.message,
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
