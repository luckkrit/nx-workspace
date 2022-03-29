import { Injectable } from '@angular/core';
import { Course } from '../services/model/course';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  catchError,
  concatMap,
  EMPTY,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { MoodleProviderService } from '../services/moodle-provider.service';
import { Warning } from '../services/model/warning';
import { toErrorString } from '../util/error-converter';
import { UserCourseDisplay } from './user-course-store';
import { UserDetail } from '../services/model/user-detail';
import { CourseCategories } from '../services/model/course-categories';

export interface CourseWithEnrol extends Course {
  isEnroll: boolean;
}

export interface CourseState {
  warnings: Warning[];
  courses: CourseWithEnrol[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isWarning: boolean;
  error: string;
}

@Injectable()
export class CourseStore extends ComponentStore<CourseState> {
  readonly courses$ = this.select(({ courses }) => courses);
  readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  readonly error$ = this.select(({ error }) => error);
  readonly warnings$ = this.select(({ warnings }) => warnings);
  readonly isError$ = this.select(({ isError }) => isError);
  readonly isSuccess$ = this.select(({ isSuccess }) => isSuccess);
  readonly isWarning$ = this.select(({ isWarning }) => isWarning);
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

  private getToken(): Observable<string> {
    return this.moodleProviderService.getToken().pipe(
      catchError((error: string | Error) => {
        this.patchState({
          isLoading: false,
          isError: true,
          isSuccess: false,
          isWarning: false,
          error: toErrorString(error),
          courses: [],
          warnings: [],
        });

        return EMPTY;
      })
    );
  }

  readonly getCourse = (categoryId: number, returnUserCount: number) =>
    this.effect(() => {
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
        switchMap((token) => {
          return this.moodleProviderService
            .getCourseByField(token, categoryId)
            .pipe(
              concatMap(({ warnings, courses }) => {
                return this.getUserId(token).pipe(
                  concatMap((id) => {
                    return this.getUserCourse(token, id, returnUserCount).pipe(
                      map((userCourses) => {
                        const courseWithEnrols: CourseWithEnrol[] = [];
                        courses.forEach((course) => {
                          const userCourse = userCourses.find(
                            (u) => u.id == course.id
                          );
                          if (userCourse) {
                            courseWithEnrols.push({
                              ...course,
                              isEnroll: true,
                            });
                          } else {
                            courseWithEnrols.push({
                              ...course,
                              isEnroll: false,
                            });
                          }
                        });
                        if (warnings.length > 0) {
                          this.patchState({
                            courses: courseWithEnrols,
                            warnings: warnings,
                            isLoading: false,
                            isSuccess: false,
                            isWarning: true,
                            isError: false,
                            error: '',
                          });
                        } else {
                          this.patchState({
                            courses: courseWithEnrols,
                            warnings: warnings,
                            isLoading: false,
                            isSuccess: true,
                            isWarning: false,
                            isError: false,
                            error: '',
                          });
                        }
                        return EMPTY;
                      })
                    );
                  })
                );
              })
            );
        })
      );
    });
  private readonly getCourseCategories = (
    token: string
  ): Observable<CourseCategories[]> => {
    return this.moodleProviderService.getCourseCategories(token).pipe(
      catchError((error) => {
        this.patchState({
          isError: true,
          error,
          isLoading: false,
          isSuccess: false,
          courses: [],
        });
        return EMPTY;
      })
    );
  };
  private readonly getUserId = (token: string): Observable<number> => {
    return this.moodleProviderService.getUser().pipe(
      concatMap(({ id }) => {
        if (id) {
          return of(id);
        } else {
          return this.getUserDetail(token).pipe(
            map((userDetail) => {
              return userDetail.userid;
            }),
            catchError((error: string | Error) => {
              this.patchState({
                isError: true,
                error: toErrorString(error),
                isLoading: false,
                isSuccess: false,
                courses: [],
              });
              return EMPTY;
            })
          );
        }
      }),
      catchError((error: string | Error) => {
        this.patchState({
          isError: true,
          error: toErrorString(error),
          isLoading: false,
          isSuccess: false,
          courses: [],
        });
        return EMPTY;
      })
    );
  };
  private readonly getUserDetail = (token: string): Observable<UserDetail> => {
    return this.moodleProviderService.getUserDetail(token).pipe(
      catchError((error: string | Error) => {
        this.patchState({
          isError: true,
          error: toErrorString(error),
          isLoading: false,
          isSuccess: false,
          courses: [],
        });
        return EMPTY;
      })
    );
  };
  private readonly getUserCourse = (
    token: string,
    userId: number,
    returnUserCount: number
  ) => {
    return this.moodleProviderService
      .getUserCourse({ token, userId, returnUserCount })
      .pipe(
        catchError((error: string | Error) => {
          this.patchState({
            isError: true,
            error: toErrorString(error),
            isLoading: false,
            isSuccess: false,
            courses: [],
          });
          return EMPTY;
        })
      );
  };
}
