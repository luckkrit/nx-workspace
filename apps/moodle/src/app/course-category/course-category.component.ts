import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseCategories } from '../services/model/course-categories';
import { AlertsType } from '../store/alerts-store';
import { CourseCategoryStore } from '../store/course-category-store';

@Component({
  selector: 'nx-workspace-course-category',
  templateUrl: './course-category.component.html',
  styleUrls: ['./course-category.component.css'],
})
export class CourseCategoryComponent implements OnInit {
  isLoading$ = this.courseCategoryStore.isLoading$;
  isError$ = this.courseCategoryStore.isError$;
  isSuccess$ = this.courseCategoryStore.isSuccess$;
  error$ = this.courseCategoryStore.error$;
  categories$ = this.courseCategoryStore.categories$;
  loadingText = 'Loading';
  successText = 'Loading Success';
  infoType = AlertsType.ALERT_INFO;
  successType = AlertsType.ALERT_SUCCESS;
  dangerType = AlertsType.ALERT_DANGER;

  constructor(private courseCategoryStore: CourseCategoryStore) {}

  ngOnInit(): void {
    this.courseCategoryStore.getCategory();
  }
  viewCourse(courseCategories: CourseCategories) {
    this.courseCategoryStore.setSharedCategory(courseCategories);
  }
}
