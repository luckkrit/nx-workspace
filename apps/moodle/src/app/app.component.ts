import { Component, OnInit } from '@angular/core';
import { AlertsStore } from './store/alerts-store';
import { LoginUserStore } from './store/login-user-store';
import { RegisterUserStore } from './store/register-user-store';

@Component({
  selector: 'nx-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginUserStore, AlertsStore, RegisterUserStore]
})
export class AppComponent implements OnInit {
  constructor() {

  }
  ngOnInit(): void {
  }
  title = 'moodle';
}
