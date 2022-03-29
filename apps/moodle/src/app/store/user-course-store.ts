import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  catchError,
  concatMap,
  EMPTY,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { CourseCategories } from '../services/model/course-categories';
import { UserDetail } from '../services/model/user-detail';
import { MoodleProviderService } from '../services/moodle-provider.service';
import { toErrorString } from '../util/error-converter';

export interface UserCourseDisplay {
  id: number;
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
  courses$ = this.select(({ courses }) => courses);
  isLoading$ = this.select(({ isLoading }) => isLoading);
  isError$ = this.select(({ isError }) => isError);
  isSuccess$ = this.select(({ isSuccess }) => isSuccess);
  error$ = this.select(({ error }) => error);
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
  ) => {
    console.log('get user course');
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

  readonly getUserCourseDisplay = (returnUserCount: number) =>
    this.effect(() => {
      this.patchState({
        isError: false,
        error: '',
        isLoading: true,
        isSuccess: false,
        courses: [],
      });
      console.log('get user course display');
      return this.getToken().pipe(
        concatMap((token) => {
          console.log('before get course categories');
          return this.getCourseCategories(token).pipe(
            concatMap((categories) => {
              console.log('before get user id');
              return this.getUserId(token).pipe(
                concatMap((id) => {
                  console.log('before get user course');
                  return this.getUserCourse(token, id, returnUserCount).pipe(
                    map((userCourses) => {
                      const userCoursesDisplay = userCourses.map(
                        (userCourse) => {
                          const category = categories.find(
                            (category) => category.id == userCourse.category
                          );
                          const categoryName =
                            typeof category != 'undefined' ? category.name : '';
                          return {
                            id: userCourse.id,
                            courseDisplayname: userCourse.displayname,
                            categoryName: categoryName,
                            courseStartdate: new Date(
                              userCourse.startdate * 1000
                            ),
                            courseEnddate: new Date(userCourse.enddate * 1000),
                            courseLastaccess: userCourse.lastaccess
                              ? new Date(userCourse.lastaccess * 1000)
                              : null,
                          };
                        }
                      );
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
      );
    });

  private readonly getCourseCategories = (
    token: string
  ): Observable<CourseCategories[]> => {
    console.log('get course categories');
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
  private readonly getToken = (): Observable<string> => {
    console.log('user-course-store get token');
    return this.moodleProviderService.getToken().pipe(
      map((token) => {
        return token;
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
  private readonly getUserId = (token: string): Observable<number> => {
    console.log('user course store getuserid');
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
    console.log('user course store get user detail');
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
}
