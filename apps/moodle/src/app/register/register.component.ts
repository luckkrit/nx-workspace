import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, Subject, takeUntil } from 'rxjs';
import { AlertsType } from '../store/alerts-store';
import { RegisterUserStore } from '../store/register-user-store';

@Component({
  selector: 'nx-workspace-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoading$ = this.registerUserStore.isLoading$;
  isError$ = this.registerUserStore.isError$;
  isSuccess$ = this.registerUserStore.isSuccess$;
  error$ = this.registerUserStore.error$;
  loadingText = 'Loading';
  successText = 'Loading Success';
  infoType = AlertsType.ALERT_INFO;
  successType = AlertsType.ALERT_SUCCESS;
  dangerType = AlertsType.ALERT_DANGER;
  ngDestroy$ = new Subject();
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });
  constructor(
    private registerUserStore: RegisterUserStore,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.ngDestroy$.next(true);
    this.ngDestroy$.complete();
  }

  ngOnInit(): void {
    this.isSuccess$
      .pipe(takeUntil(this.ngDestroy$), delay(5000))
      .subscribe((isSuccess) => {
        if (isSuccess) {
          this.router.navigate(['/login']);
        }
      });
  }
  onRegister(): void {
    this.registerUserStore.register(this.registerForm.value);
  }
}
