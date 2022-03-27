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
export class RegisterComponent implements OnInit {
  isLoading$ = this.registerUserStore.isLoading$;
  isError$ = this.registerUserStore.isError$;
  isSuccess$ = this.registerUserStore.isSuccess$;
  error$ = this.registerUserStore.error$;
  loadingText = 'Loading';
  successText = 'Loading Success';
  infoType = AlertsType.ALERT_INFO;
  successType = AlertsType.ALERT_SUCCESS;
  dangerType = AlertsType.ALERT_DANGER;
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });
  constructor(private registerUserStore: RegisterUserStore) {}

  ngOnInit(): void {}
  onRegister(): void {
    this.registerUserStore.register(this.registerForm.value);
  }
}
