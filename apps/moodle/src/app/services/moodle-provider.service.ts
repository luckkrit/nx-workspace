import {Injectable} from '@angular/core';
import {UserStorageService} from "./user-storage.service";
import {MoodleWsService} from "./moodle-ws.service";
import {catchError, flatMap, map, mergeMap, Observable, of, Subject, tap, throwError} from "rxjs";
import {User} from "./model/user";
import {UserDetail} from "./model/user-detail";
import {CourseCategories} from "./model/course-categories";
import {GetCourseFieldType} from "./model/get-course-by-field-dto";
import {CourseWarning} from "./model/course-warning";
import {SelfEnrolWarning} from "./model/self-enrol-warning";

@Injectable({
  providedIn: 'root'
})
export class MoodleProviderService {

  constructor(private _userStorageService: UserStorageService, private _moodleWsService: MoodleWsService) {
  }

  getUser(): Observable<User> {
    this._userStorageService.loadUser();
    return this._userStorageService.userStorage$;
  }

  getToken(): Observable<string> {
    return this.getUser().pipe(map((user) => {
      return user.token
    }))
  }

  saveUser(user: User) {
    this._userStorageService.saveUser(user);
  }

  registerUser(username: string, password: string, firstname: string, lastname: string, email: string): Observable<User> {
    return this._moodleWsService.registerUser({username, password, firstname, lastname, email}).pipe(map((response) => {
      if (typeof response.users === 'undefined' || response.users.length == 0) throw new Error("Users not create");
      let user = response.users[0];
      if (user && user.id) {
        return {id: user.id, username, password, firstname, lastname, email, token: ""};
      } else {
        throw new Error("Users not create");
      }
    }));
  }

  login(username: string, password: string): Observable<User> {

    return this._moodleWsService.login({
      username,
      password
    }).pipe(mergeMap(response => this._userStorageService.userStorage$.pipe(map(user => {
      if (user != null) {
        user.token = response.token;
        this.saveUser(user)
      } else {
        throw new Error("User not found");
      }
      return user;
    }))));
  }

  getUserDetail(token: string): Observable<UserDetail> {
    return this._moodleWsService.getUserDetail(token);
  }

  getCourseCategories(token: string): Observable<Array<CourseCategories>> {
    return this._moodleWsService.getCourseCategories(token);
  }

  getCourseByField(token: string, categoryId: number): Observable<CourseWarning> {
    return this._moodleWsService.getCourseByField({
      token,
      field: {type: GetCourseFieldType.CATEGORY, value: categoryId}
    });
  }

  selfEnrolCourse(token: string, courseId: number): Observable<SelfEnrolWarning> {
    return this._moodleWsService.selfEnrolCourse({token, courseId});
  }
}
