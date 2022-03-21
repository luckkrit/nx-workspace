import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { AlertsStore } from '../store/alerts-store';
import { LoginUserStore } from '../store/login-user-store';

@Component({
  selector: 'nx-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isShowAlert$ = this.alertsStore.isShow$
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  constructor(private loginUserStore: LoginUserStore, private alertsStore: AlertsStore) { }
  ngOnInit(): void {
    this.loginUserStore.isLoading$.subscribe({
      next: (isLoading) => {
        if (isLoading) {
          this.alertsStore.showAlertInfo("Loading", "Info")
        } else {
          this.alertsStore.hideAlert()
        }
      }
    })
    this.loginUserStore.error$.subscribe({
      next: (error) => {
        if (error && error.length > 0) {
          this.alertsStore.showAlertDanger(error, "Error")
        } else {
          this.alertsStore.hideAlert()
        }
      }
    })
  }
  onSubmit(): void {
    const { username, password } = this.loginForm.value
    this.loginUserStore.login({ username, password })
  }

}
