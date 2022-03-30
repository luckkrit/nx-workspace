import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { delay, of, Subject, takeUntil } from 'rxjs';
import { LoginUserStore } from '../store/login-user-store';
import { AlertsType } from '../store/alerts-store';
import { Router } from '@angular/router';
import { NavbarStore } from '../store/navbar-store';

@Component({
  selector: 'nx-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading$ = this.loginUserStore.isLoading$;
  isError$ = this.loginUserStore.isError$;
  isSuccess$ = this.loginUserStore.isSuccess$;
  isRedirect$ = this.loginUserStore.isRedirect$;
  error$ = this.loginUserStore.error$;
  loadingText = 'Loading';
  successText = 'Login Success';
  infoType = AlertsType.ALERT_INFO;
  successType = AlertsType.ALERT_SUCCESS;
  dangerType = AlertsType.ALERT_DANGER;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private loginUserStore: LoginUserStore,
    private navbarStore: NavbarStore
  ) {}
  ngOnInit(): void {}
  onSubmit(): void {
    this.loginUserStore.login(this.loginForm.value);
  }
  onAlertClose(isClose: boolean): void {
    if (isClose) {
      this.navbarStore.checkLogin();
      this.loginUserStore.redirect(isClose);
    }
  }
}
