import { Component, OnInit } from '@angular/core';
import { AlertsStore } from './store/alerts-store';
import { ConfirmModalStore } from './store/confirm-modal-store';
import { CourseCategoryStore } from './store/course-category-store';
import { CourseStore } from './store/course-store';
import { LoginUserStore } from './store/login-user-store';
import { NavbarStore } from './store/navbar-store';
import { RedirectStore } from './store/redirect-store';
import { RegisterUserStore } from './store/register-user-store';
import { UserCourseStore } from './store/user-course-store';
import { UserDetailStore } from './store/user-detail-store';

@Component({
  selector: 'nx-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    LoginUserStore,
    // AlertsStore,
    RegisterUserStore,
    RedirectStore,
    UserDetailStore,
    UserCourseStore,
    CourseCategoryStore,
    CourseStore,
    ConfirmModalStore,
    NavbarStore,
  ],
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  title = 'moodle';
}
