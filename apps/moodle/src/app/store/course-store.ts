import { Injectable } from '@angular/core';
import { Course } from '../services/model/course';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { catchError, concatMap, EMPTY, Observable, of, switchMap } from 'rxjs';
import { MoodleProviderService } from '../services/moodle-provider.service';
import { Warning } from '../services/model/warning';
import { toErrorString } from '../util/error-converter';
import { UserCourseDisplay } from './user-course-store';

export interface CourseWithEnrol extends Course {
  isEnroll: boolean;
}

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
    console.log('course store get token');
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

  readonly getCourse = (categoryId: number) =>
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
              tapResponse(
                ({ warnings, courses }) => {
                  if (warnings.length > 0) {
                    this.patchState({
                      courses: courses,
                      warnings: warnings,
                      isLoading: false,
                      isSuccess: false,
                      isWarning: true,
                      isError: false,
                      error: '',
                    });
                  } else {
                    this.patchState({
                      courses: courses,
                      warnings: warnings,
                      isLoading: false,
                      isSuccess: true,
                      isWarning: false,
                      isError: false,
                      error: '',
                    });
                  }
                },
                (error: string | Error) =>
                  this.patchState({
                    isLoading: false,
                    isSuccess: false,
                    isError: true,
                    isWarning: false,
                    error: toErrorString(error),
                    courses: [],
                    warnings: [],
                  })
              )
            );
        })
      );
    });
}
