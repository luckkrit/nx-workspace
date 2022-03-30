import { Component, OnInit } from '@angular/core';
import { NavbarStore } from '../store/navbar-store';

@Component({
  selector: 'nx-workspace-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isShow$ = this.navbarStore.isShow$;
  isLogin$ = this.navbarStore.isLogin$;
  isLogout$ = this.navbarStore.isLogout$;
  constructor(private navbarStore: NavbarStore) {}

  ngOnInit(): void {
    this.navbarStore.checkLogin();
  }
  onLogout(): void {
    this.navbarStore.logout();
  }
}
