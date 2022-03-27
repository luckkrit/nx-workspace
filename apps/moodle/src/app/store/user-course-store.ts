import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { catchError, concatMap, EMPTY, map, switchMap } from 'rxjs';
import { MoodleProviderService } from '../services/moodle-provider.service';

export interface UserCourseDisplay {
  course_displayname: string;
  category_name: string;
  course_startdate: string;
  course_enddate: string;
  course_lastaccess: string;
}

export interface UserCourseState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string;
  courses: UserCourseDisplay[];
}
@Injectable()
export class UserCourseStore extends ComponentStore<UserCourseState> {
  constructor(private moodleProviderService: MoodleProviderService) {
    super({
      isError: false,
      isLoading: false,
      isSuccess: false,
      error: '',
      courses: [],
    });
  }
  readonly getUserCourse = this.effect(() =>
    this.moodleProviderService.getToken().pipe(
      switchMap((token) => {
        if (token) {
          return this.moodleProviderService.getCourseCategories(token).pipe();
        } else {
          this.patchState({
            error: '',
            isError: true,
            isLoading: false,
            isSuccess: false,
            courses: [],
          });
          return EMPTY;
        }
      }),
      catchError((error) => {
        this.patchState({
          error: error,
          isError: true,
          isLoading: false,
          isSuccess: false,
          courses: [],
        });
        return EMPTY;
      })
    )
  );
}
