import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { of, tap } from 'rxjs';
import { Course } from '../services/model/course';
import { CourseCategories } from '../services/model/course-categories';
import { AlertsType } from '../store/alerts-store';
import { ConfirmModalStore } from '../store/confirm-modal-store';
import { CourseStore } from '../store/course-store';
import { UserCourseStore } from '../store/user-course-store';

@Component({
  selector: 'nx-workspace-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  providers: [],
})
export class CourseComponent implements OnInit {
  courses$ = this.courseStore.courses$;
  isLoading$ = this.courseStore.isLoading$;
  error$ = this.courseStore.error$;
  warnings$ = this.courseStore.warnings$;
  isError$ = this.courseStore.isError$;
  isSuccess$ = this.courseStore.isSuccess$;
  isWarning$ = this.courseStore.isWarning$;
  category$ = this.courseStore.category$;
  loadingText = 'Loading';
  successText = 'Loading Success';
  infoType = AlertsType.ALERT_INFO;
  successType = AlertsType.ALERT_SUCCESS;
  dangerType = AlertsType.ALERT_DANGER;
  warningType = AlertsType.ALERT_WARNING;
  private course: Course | null = null;
  private categoryId: number = -1;
  constructor(
    private courseStore: CourseStore,
    private route: ActivatedRoute,
    private confirmModalStore: ConfirmModalStore
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');
    this.categoryId = Number(categoryId);
    this.courseStore.getCourse(Number(categoryId), 0);
  }
  onEnrolment(course: Course): void {
    this.course = course;
    this.confirmModalStore.showModal({
      title: 'Confirm',
      body: 'Are you sure enroll ' + course.displayname,
      cancelText: 'Cancel',
      confirmText: 'Confirm',
    });
  }
  onModalConfirm(): void {
    if (this.course) {
      this.courseStore.enrolCourse(this.course?.id, this.categoryId, 0);
    }
  }
}
