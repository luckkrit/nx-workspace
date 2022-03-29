import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { MoodleWsService } from './moodle-ws.service';
import {
  catchError,
  concatMap,
  EMPTY,
  flatMap,
  map,
  mergeMap,
  Observable,
  of,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import { User } from './model/user';
import { UserDetail } from './model/user-detail';
import { CourseCategories } from './model/course-categories';
import { GetCourseFieldType } from './model/get-course-by-field-dto';
import { CourseWarning } from './model/course-warning';
import { SelfEnrolWarning } from './model/self-enrol-warning';
import { UserCourseDto } from './model/user-course-dto';
import { UserCourse } from './model/user-course';

@Injectable({
  providedIn: 'root',
})
export class MoodleProviderService {
  constructor(
    private userStorageService: UserStorageService,
    private moodleWsService: MoodleWsService
  ) {}

  getUser(): Observable<Partial<User>> {
    return this.userStorageService.userStorage$;
  }

  getToken(): Observable<string> {
    return this.userStorageService.getToken();
  }

  saveUser(user: Partial<User>) {
    this.userStorageService.saveUser(user);
  }
  saveToken(username: string, token: string) {
    this.userStorageService.saveToken(username, token);
  }

  registerUser(
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    email: string
  ): Observable<Partial<User>> {
    return this.moodleWsService
      .registerUser({ username, password, firstname, lastname, email })
      .pipe(
        map((response) => {
          if (typeof response === 'undefined' || response.length == 0)
            throw new Error('Users not create');
          const user = response[0];
          if (user && user.id) {
            const saveUser = {
              id: user.id,
              username,
              firstname,
              lastname,
              token: '',
            };
            this.userStorageService.saveUser(saveUser);
            return saveUser;
          } else {
            throw new Error('Users not create');
          }
        })
      );
  }

  login(username: string, password: string): Observable<boolean> {
    return this.moodleWsService
      .login({
        username,
        password,
      })
      .pipe(
        concatMap(({ token }) => {
          this.saveToken(username, token);
          return of(true);
        })
      );
  }

  getUserDetail(token: string): Observable<UserDetail> {
    return this.moodleWsService.getUserDetail(token).pipe(
      tap(({ userid, username, firstname, lastname }) => {
        this.userStorageService.saveUser({
          id: userid,
          username: username,
          firstname: firstname,
          lastname: lastname,
          token,
        });
      })
    );
  }

  getUserCourse(userCourseDto: UserCourseDto): Observable<UserCourse[]> {
    return this.moodleWsService.getUserCourse(userCourseDto);
  }

  getCourseCategories(token: string): Observable<Array<CourseCategories>> {
    return this.moodleWsService.getCourseCategories(token);
  }

  getCourseByField(
    token: string,
    categoryId: number
  ): Observable<CourseWarning> {
    return this.moodleWsService.getCourseByField({
      token,
      field: { type: GetCourseFieldType.CATEGORY, value: categoryId },
    });
  }

  selfEnrolCourse(
    token: string,
    courseId: number
  ): Observable<SelfEnrolWarning> {
    return this.moodleWsService.selfEnrolCourse({ token, courseId });
  }
}
