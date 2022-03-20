import { Component, OnInit } from '@angular/core';
import { LoginUserStore } from '../store/login-user-store';

@Component({
  selector: 'nx-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginUserStore]
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
