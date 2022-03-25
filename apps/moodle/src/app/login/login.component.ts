import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { delay, of, Subject, takeUntil } from 'rxjs';
import { LoginUserStore } from '../store/login-user-store';
import { AlertsType } from '../store/alerts-store';
import { Router } from '@angular/router';

@Component({
  selector: 'nx-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading$ = this.loginUserStore.isLoading$;
  isError$ = this.loginUserStore.isError$;
  isSuccess$ = this.loginUserStore.isSuccess$;
  error$ = this.loginUserStore.error$;
  ngDestroy$ = new Subject();
  loadingText = 'Loading';
  successText = 'Loading Success';
  infoType = AlertsType.ALERT_INFO;
  successType = AlertsType.ALERT_SUCCESS;
  dangerType = AlertsType.ALERT_DANGER;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private loginUserStore: LoginUserStore, private router: Router) {}
  ngOnDestroy(): void {
    this.ngDestroy$.next(true);
    this.ngDestroy$.complete();
  }
  ngOnInit(): void {
    this.isSuccess$
      .pipe(takeUntil(this.ngDestroy$), delay(5000))
      .subscribe((isSuccess) => {
        if (isSuccess) {
          this.router.navigate(['/user-detail']);
        }
      });
  }
  onSubmit(): void {
    this.loginUserStore.login(this.loginForm.value);
  }
}
