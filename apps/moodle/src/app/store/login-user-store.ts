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
}

@Injectable()
export class LoginUserStore extends ComponentStore<LoginUserState> {
  readonly isSuccess$ = this.select((state) => state.isSuccess);
  readonly isLoading$ = this.select((state) => state.isLoading);
  readonly isError$ = this.select((state) => state.isError);
  readonly error$ = this.select((state) => state.error);
  readonly status$ = this.select((state) => state);

  constructor(private moodleProviderService: MoodleProviderService) {
    super({
      isLoading: false,
      error: '',
      isSuccess: false,
      isError: false,
    });
  }
  // readonly login = this.effect((userLoginDto$: Observable<UserLoginDto>) => {
  //   return userLoginDto$.pipe(
  //     switchMap(({ username, password }) => {
  //       this.patchState({
  //         isLoading: true,
  //         error: '',
  //         isSuccess: false,
  //         isError: false,
  //       });
  //       return this.moodleProviderService.login(username, password).pipe(
  //         tapResponse(
  //           (isSuccess) => {
  //             this.patchState({
  //               isLoading: false,
  //               isSuccess,
  //               isError: false,
  //               error: '',
  //             });
  //           },
  //           (error: Error) => {
  //             this.patchState({
  //               isLoading: false,
  //               isError: true,
  //               error: error.message,
  //               isSuccess: false,
  //             });
  //           }
  //         )
  //       );
  //     })
  //   );
  // });
  readonly login = this.effect((userLoginDto$: Observable<UserLoginDto>) => {
    return userLoginDto$.pipe(
      switchMap(({ username, password }) => {
        this.patchState({
          isLoading: true,
          error: '',
          isSuccess: false,
          isError: false,
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
                  });
                },
                (error: Error) => {
                  this.patchState({
                    isLoading: false,
                    isError: true,
                    error: error.message,
                    isSuccess: false,
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
