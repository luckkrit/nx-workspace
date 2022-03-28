import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  catchError,
  concatMap,
  EMPTY,
  flatMap,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { CourseCategories } from '../services/model/course-categories';
import { User } from '../services/model/user';
import { UserDetail } from '../services/model/user-detail';
import { MoodleProviderService } from '../services/moodle-provider.service';

export interface UserCourseDisplay {
  courseDisplayname: string;
  categoryName: string;
  courseStartdate: Date;
  courseEnddate: Date;
  courseLastaccess: Date | null;
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
  courses$ = this.select((state) => state.courses);
  isLoading$ = this.select((state) => state.isLoading);
  isError$ = this.select((state) => state.isError);
  isSuccess$ = this.select((state) => state.isSuccess);
  error$ = this.select((state) => state.error);
  constructor(private moodleProviderService: MoodleProviderService) {
    super({
      isError: false,
      isLoading: false,
      isSuccess: false,
      error: '',
      courses: [],
    });
  }
  private readonly getUserCourse = (
    token: string,
    userId: number,
    returnUserCount: number
  ) =>
    this.moodleProviderService
      .getUserCourse({ token, userId, returnUserCount })
      .pipe(
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

  readonly getUserCourseDisplay = this.effect(
    (returnUserCount$: Observable<number>) => {
      this.patchState({
        isError: false,
        error: '',
        isLoading: true,
        isSuccess: false,
        courses: [],
      });
      return returnUserCount$.pipe(
        switchMap((returnUserCount) =>
          this.getToken().pipe(
            concatMap((token) => {
              return this.getCourseCategories(token).pipe(
                concatMap((categories) => {
                  return this.getUserId(token).pipe(
                    concatMap((id) => {
                      return this.getUserCourse(
                        token,
                        id,
                        returnUserCount
                      ).pipe(
                        map((userCourses) => {
                          const userCoursesDisplay = userCourses.map(
                            (userCourse) => {
                              const category = categories.find(
                                (category) => category.id == userCourse.category
                              );
                              const categoryName =
                                typeof category != 'undefined'
                                  ? category.name
                                  : '';
                              return {
                                courseDisplayname: userCourse.displayname,
                                categoryName: categoryName,
                                courseStartdate: new Date(
                                  userCourse.startdate * 1000
                                ),
                                courseEnddate: new Date(
                                  userCourse.enddate * 1000
                                ),
                                courseLastaccess: userCourse.lastaccess
                                  ? new Date(userCourse.lastaccess * 1000)
                                  : null,
                              };
                            }
                          );
                          console.log(userCoursesDisplay);
                          this.patchState({
                            isSuccess: true,
                            isError: false,
                            isLoading: false,
                            error: '',
                            courses: userCoursesDisplay,
                          });
                          return EMPTY;
                        })
                      );
                    })
                  );
                })
              );
            })
          )
        )
      );
    }
  );

  private readonly getCourseCategories = (
    token: string
  ): Observable<CourseCategories[]> =>
    this.moodleProviderService.getCourseCategories(token).pipe(
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

  private readonly getToken = (): Observable<string> =>
    this.moodleProviderService.getToken().pipe(
      map((token) => {
        return token;
      }),
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

  private readonly getUserId = (token: string): Observable<number> =>
    this.moodleProviderService.getUser().pipe(
      mergeMap(({ id }) => {
        if (id) {
          return of(id);
        } else {
          return this.getUserDetail(token).pipe(
            map((userDetail) => {
              return userDetail.userid;
            }),
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
        }
      }),
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

  private readonly getUserDetail = (token: string): Observable<UserDetail> =>
    this.moodleProviderService.getUserDetail(token).pipe(
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
}
