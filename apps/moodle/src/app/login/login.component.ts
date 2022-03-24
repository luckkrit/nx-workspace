import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  catchError,
  concat,
  concatMap,
  concatWith,
  delay,
  EMPTY,
  from,
  map,
  mergeMap,
  of,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { UserStorageService } from '../services/user-storage.service';
import { AlertsStore } from '../store/alerts-store';
import { LoginUserStore } from '../store/login-user-store';

@Component({
  selector: 'nx-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  ngDestroy$ = new Subject();
  isShowAlert$ = this.alertsStore.isShow$;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private loginUserStore: LoginUserStore,
    private alertsStore: AlertsStore
  ) {}
  ngOnDestroy(): void {
    this.ngDestroy$.next(true);
    this.ngDestroy$.complete();
  }
  ngOnInit(): void {
    this.loginUserStore.state$
      .pipe(
        takeUntil(this.ngDestroy$),
        concatMap((m) => of(m).pipe(delay(1000)))
      )
      .subscribe(({ isSuccess, isLoading, error }) => {
        if (isLoading) {
          this.alertsStore.showAlertInfoEffect({
            message: 'Loading',
            header: 'Info',
            timeOut: 5000,
          });
        } else if (isSuccess) {
          this.alertsStore.showAlertSuccessEffect({
            message: 'Loading Success',
            header: 'Success',
            timeOut: 5000,
          });
        } else if (error.length > 0) {
          this.alertsStore.showAlertDangerEffect({
            message: error,
            header: 'Error',
            timeOut: 5000,
          });
        }
      });
    // this.loginUserStore.isSuccess$
    //   .pipe(takeUntil(this.ngDestroy$))
    //   .subscribe((isSuccess) => {
    //     console.log(isSuccess);
    //     this.alertsStore.showAlertSuccessEffect({
    //       message: 'Loading Success',
    //       header: 'Success',
    //       timeOut: 5000,
    //     });
    //   });
    // this.loginUserStore.isLoading$
    //   .pipe(takeUntil(this.ngDestroy$))
    //   .subscribe((isLoading) =>
    //     this.alertsStore.showAlertInfoEffect({
    //       message: 'Loading',
    //       header: 'Info',
    //       timeOut: 5000,
    //     })
    //   );
    // this.loginUserStore.error$
    //   .pipe(takeUntil(this.ngDestroy$))
    //   .subscribe((error) =>
    //     this.alertsStore.showAlertDangerEffect({
    //       message: error.toString(),
    //       header: 'Error',
    //       timeOut: 5000,
    //     })
    //   );
    // this.alertsStore.initAlert({
    //   status$: this.loginUserStore.status$,
    //   header: { loading: 'Info', success: 'Success', error: 'Error' },
    //   message: { loading: 'Loading', success: 'Loading Success' },
    //   timeOut: 3000,
    // });
  }
  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    this.loginUserStore.login({ username, password });
  }
}
