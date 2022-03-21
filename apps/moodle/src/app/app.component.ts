import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsStore } from './store/alerts-store';
import { AppStore } from './store/app-store';
import { LoginUserStore } from './store/login-user-store';
import { RegisterUserStore } from './store/register-user-store';

@Component({
  selector: 'nx-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppStore, LoginUserStore, AlertsStore, RegisterUserStore]
})
export class AppComponent implements OnInit {
  constructor(private appStore: AppStore, private router: Router) {

  }
  ngOnInit(): void {
    this.appStore.state$.subscribe({
      next: (state) => {
        if (state.isInit) {
          this.appStore.getUser();
        } else if (state.isRegister) {
          console.log('to login');
          this.router.navigate(['/login'])
        } else {
          console.log('to register')
          this.router.navigate(['/register'])
        }
      }
    })
  }
  title = 'moodle';
}
