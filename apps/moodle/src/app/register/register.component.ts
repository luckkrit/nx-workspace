import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertsStore } from '../store/alerts-store';
import { RegisterUserStore } from '../store/register-user-store';

@Component({
  selector: 'nx-workspace-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isShowAlert$ = this.alertsStore.isShow$;
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });
  constructor(
    private alertsStore: AlertsStore,
    private registerUserStore: RegisterUserStore
  ) {}

  ngOnInit(): void {
    // this.registerUserStore.isLoading$.subscribe({
    //   next: (isLoading) => {
    //     console.log(isLoading)
    //     if (isLoading) {
    //       this.alertsStore.showAlertInfo("Loading", "Info")
    //     } else {
    //       this.alertsStore.hideAlert()
    //     }
    //   }
    // })
    // this.registerUserStore.error$.subscribe({
    //   next: (error) => {
    //     if (error && error.length > 0) {
    //       this.alertsStore.showAlertDanger(error, "Error")
    //     } else {
    //       this.alertsStore.hideAlert()
    //     }
    //   }
    // })
  }
  onRegister(): void {
    this.registerUserStore.register(this.registerForm.value);
  }
}
