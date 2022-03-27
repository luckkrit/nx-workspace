import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
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
  timeout,
  timer,
} from 'rxjs';

export interface RedirectState {
  isRedirect: boolean | null;
  redirectTo: string;
  timeOut: number;
}
@Injectable()
export class RedirectStore extends ComponentStore<RedirectState> {
  constructor(private router: Router) {
    super({ isRedirect: false, redirectTo: '', timeOut: 0 });
  }
  readonly redirectTo = this.effect((state$: Observable<RedirectState>) =>
    state$.pipe(
      concatMap(({ isRedirect, redirectTo, timeOut }) => {
        if (isRedirect && isRedirect == true) {
          if (timeOut > 0) {
            return timer(timeOut).pipe(
              tap(() => {
                this.router.navigate([redirectTo]);
              })
            );
          } else {
            this.router.navigate([redirectTo]);
            return EMPTY;
          }
        } else {
          return EMPTY;
        }
      })
    )
  );
}
