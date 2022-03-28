import { Component, OnInit } from '@angular/core';
import { AlertsType } from '../store/alerts-store';
import { UserCourseStore } from '../store/user-course-store';

@Component({
  selector: 'nx-workspace-user-course',
  templateUrl: './user-course.component.html',
  styleUrls: ['./user-course.component.css'],
})
export class UserCourseComponent implements OnInit {
  courses$ = this.userCourseStore.courses$;
  isLoading$ = this.userCourseStore.isLoading$;
  isError$ = this.userCourseStore.isError$;
  isSuccess$ = this.userCourseStore.isSuccess$;
  error$ = this.userCourseStore.error$;
  loadingText = 'Loading';
  successText = 'Loading Success';
  infoType = AlertsType.ALERT_INFO;
  successType = AlertsType.ALERT_SUCCESS;
  dangerType = AlertsType.ALERT_DANGER;
  constructor(private userCourseStore: UserCourseStore) {}

  ngOnInit(): void {
    this.userCourseStore.getUserCourseDisplay(0);
  }
}
