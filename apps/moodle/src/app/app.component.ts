import { Component, OnInit } from '@angular/core';
import { AlertsStore } from './store/alerts-store';
import { LoginUserStore } from './store/login-user-store';
import { RedirectStore } from './store/redirect-store';
import { RegisterUserStore } from './store/register-user-store';
import { UserDetailStore } from './store/user-detail-store';

@Component({
  selector: 'nx-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    LoginUserStore,
    AlertsStore,
    RegisterUserStore,
    RedirectStore,
    UserDetailStore,
  ],
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  title = 'moodle';
}
