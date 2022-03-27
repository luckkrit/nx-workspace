import { Injectable } from '@angular/core';
import { Course } from '../services/model/course';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EMPTY, mergeMap, Observable, tap } from 'rxjs';
import { MoodleProviderService } from '../services/moodle-provider.service';
import { User } from '../services/model/user';
import { Warning } from '../services/model/warning';

export interface CourseState {
  warnings: Warning[];
  courses: Course[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isWarning: boolean;
  error: string;
}

@Injectable()
export class CourseStore extends ComponentStore<CourseState> {
  readonly courses$: Observable<Course[]> = this.select(
    (state) => state.courses
  );
  readonly isLoading$: Observable<boolean> = this.select(
    (state) => state.isLoading
  );
  readonly error$: Observable<string> = this.select((state) => state.error);

  constructor(private moodleProviderService: MoodleProviderService) {
    super({
      courses: [],
      isLoading: false,
      error: '',
      warnings: [],
      isError: false,
      isSuccess: false,
      isWarning: false,
    });
  }

  getUser(): Observable<Partial<User>> {
    return this.moodleProviderService.getUser();
  }

  getToken(): Observable<string | undefined> {
    return this.moodleProviderService.getToken();
  }

  readonly getCourse = this.effect((categoryId: number) => {
    if (typeof categoryId == 'undefined') {
      return EMPTY;
    } else {
      this.patchState({
        isLoading: true,
        isError: false,
        isSuccess: false,
        isWarning: false,
        error: '',
        courses: [],
        warnings: [],
      });
      return this.getToken().pipe(
        tapResponse(
          (token) => {
            if (token) {
              return this.moodleProviderService
                .getCourseByField(token, categoryId)
                .pipe(
                  tapResponse(
                    (courseWarning) => {
                      if (courseWarning.warnings.length > 0) {
                        this.patchState({
                          courses: courseWarning.courses,
                          warnings: courseWarning.warnings,
                          isLoading: false,
                          isSuccess: true,
                          isWarning: true,
                          isError: false,
                          error: '',
                        });
                      } else {
                        this.patchState({
                          courses: courseWarning.courses,
                          warnings: courseWarning.warnings,
                          isLoading: false,
                          isSuccess: true,
                          isWarning: false,
                          isError: false,
                          error: '',
                        });
                      }
                    },
                    (error: string) =>
                      this.patchState({
                        isLoading: false,
                        isSuccess: false,
                        isError: true,
                        isWarning: false,
                        error,
                        courses: [],
                        warnings: [],
                      })
                  )
                );
            } else {
              this.patchState({
                isLoading: false,
                isError: true,
                isSuccess: false,
                isWarning: false,
                error: 'User not found, please login',
                courses: [],
                warnings: [],
              });
              return EMPTY;
            }
          },
          (error: string) =>
            this.patchState({
              isLoading: false,
              isError: true,
              isSuccess: false,
              isWarning: false,
              error,
              courses: [],
              warnings: [],
            })
        )
      );
    }
  });
}
