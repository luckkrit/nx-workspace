import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, concatMap, EMPTY, mergeMap, of, tap, timer } from 'rxjs';
import { MoodleProviderService } from '../services/moodle-provider.service';
import { toErrorString } from '../util/error-converter';

export interface UserDetailState {
  firstname: string;
  lastname: string;
  username: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string;
}

@Injectable()
export class UserDetailStore extends ComponentStore<UserDetailState> {
  name$ = this.select(({ firstname, lastname }) => firstname + ' ' + lastname);
  isSuccess$ = this.select(({ isSuccess }) => isSuccess);
  isLoading$ = this.select(({ isLoading }) => isLoading);
  isError$ = this.select(({ isError }) => isError);
  error$ = this.select(({ error }) => error);
  username$ = this.select(({ username }) => username);
  constructor(private moodleProviderService: MoodleProviderService) {
    super({
      firstname: '',
      lastname: '',
      username: '',
      isLoading: false,
      isError: false,
      isSuccess: false,
      error: '',
    });
  }

  readonly getUserDetail = () =>
    this.effect(() => {
      this.patchState({
        isLoading: true,
        isError: false,
        error: '',
        isSuccess: false,
        username: '',
        lastname: '',
        firstname: '',
      });
      return this.moodleProviderService.getUser().pipe(
        concatMap(({ username, lastname, firstname, token }) => {
          if (
            firstname == '' ||
            lastname == '' ||
            username == '' ||
            typeof firstname == 'undefined' ||
            typeof lastname == 'undefined'
          ) {
            if (token) {
              return this.moodleProviderService.getUserDetail(token);
            } else {
              return timer(3000).pipe(
                concatMap(() => {
                  this.patchState({
                    isError: true,
                    error: 'User not found; please login',
                    isLoading: false,
                    isSuccess: false,
                    firstname: '',
                    lastname: '',
                    username: '',
                  });
                  return EMPTY;
                })
              );
            }
          } else {
            return timer(3000).pipe(
              concatMap(() => {
                this.patchState({
                  isError: false,
                  error: '',
                  isLoading: false,
                  isSuccess: true,
                  username: username,
                  firstname: firstname,
                  lastname: lastname,
                });
                return EMPTY;
              })
            );
          }
        }),
        catchError((error: string | Error) => {
          return timer(3000).pipe(
            concatMap(() => {
              this.patchState({
                isError: true,
                error: toErrorString(error),
                isLoading: false,
                isSuccess: false,
                firstname: '',
                lastname: '',
                username: '',
              });
              return EMPTY;
            })
          );
        })
      );
    });
}
