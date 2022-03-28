import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from './request/login-request';
import { LoginResponse } from './response/login-response';
import { CoreUserCreateUsersResponse } from './response/core-user-create-users-response';
import { CoreUserCreateUsersRequest } from './request/core-user-create-users-request';
import { User } from './model/user';
import { CoreWebserviceGetSiteInfoResponse } from './response/core-webservice-get-site-info-response';
import { CoreWebserviceGetSiteInfoRequest } from './request/core-webservice-get-site-info-request';
import { CreateUserDto } from './model/create-user-dto';
import { UserLoginDto } from './model/user-login-dto';
import { CoreCourseGetCategoriesResponse } from './response/core-course-get-categories-response';
import { CoreCourseGetCategoriesRequest } from './request/core-course-get-categories-request';
import { GetCourseByFieldDto } from './model/get-course-by-field-dto';
import { CoreCourseGetCoursesByFieldRequest } from './request/core-course-get-coures-by-field-request';
import { CoreCourseGetCoursesByFieldResponse } from './response/core-course-get-courses-by-field-response';
import { SelfEnrolCourseDto } from './model/self-enrol-course-dto';
import { EnrolSelfEnrolUserResponse } from './response/enrol-self-enrol-user-response';
import { EnrolSelfEnrolUserRequest } from './request/enrol-self-enrol-user-request';
import { CoreEnrolGetUsersCoursesResponse } from './response/core-enrol-get-users-courses';
import { CoreEnrolGetUsersCoursesRequest } from './request/core-enrol-get-users-courses-request';
import { UserCourseDto } from './model/user-course-dto';

@Injectable({
  providedIn: 'root',
})
export class MoodleWsService {
  constructor(private httpClient: HttpClient) { }

  login(userLoginDto: UserLoginDto): Observable<LoginResponse> {
    let loginRequest = new LoginRequest(userLoginDto);
    return this.httpClient.post<LoginResponse>(
      loginRequest.url,
      loginRequest.formData,
      loginRequest.queryParams
    );
  }

  registerUser(
    createUserDto: CreateUserDto
  ): Observable<CoreUserCreateUsersResponse> {
    let registerRequest = new CoreUserCreateUsersRequest(createUserDto);
    return this.httpClient.post<CoreUserCreateUsersResponse>(
      registerRequest.url,
      registerRequest.formData,
      registerRequest.queryParams
    );
  }

  getUserDetail(token: string): Observable<CoreWebserviceGetSiteInfoResponse> {
    let getUserDetailRequest = new CoreWebserviceGetSiteInfoRequest(token);
    return this.httpClient.post<CoreWebserviceGetSiteInfoResponse>(
      getUserDetailRequest.url,
      getUserDetailRequest.formData,
      getUserDetailRequest.queryParams
    );
  }

  getUserCourse(userCourseDto: UserCourseDto): Observable<CoreEnrolGetUsersCoursesResponse> {
    let getUserCoursesRequest = new CoreEnrolGetUsersCoursesRequest(userCourseDto);
    return this.httpClient.post<CoreEnrolGetUsersCoursesResponse>(getUserCoursesRequest.url, getUserCoursesRequest.formData, getUserCoursesRequest.queryParams)
  }

  getCourseCategories(
    token: string
  ): Observable<CoreCourseGetCategoriesResponse> {
    let getCourseCategories = new CoreCourseGetCategoriesRequest(token);
    return this.httpClient.post<CoreCourseGetCategoriesResponse>(
      getCourseCategories.url,
      getCourseCategories.formData,
      getCourseCategories.queryParams
    );
  }

  getCourseByField(
    getCourseByFieldDto: GetCourseByFieldDto
  ): Observable<CoreCourseGetCoursesByFieldResponse> {
    let getCourseByFieldRequest = new CoreCourseGetCoursesByFieldRequest(
      getCourseByFieldDto
    );
    return this.httpClient.post<CoreCourseGetCoursesByFieldResponse>(
      getCourseByFieldRequest.url,
      getCourseByFieldRequest.formData,
      getCourseByFieldRequest.queryParams
    );
  }

  selfEnrolCourse(
    selfEnrolCourseDto: SelfEnrolCourseDto
  ): Observable<EnrolSelfEnrolUserResponse> {
    let selfEnrolRequest = new EnrolSelfEnrolUserRequest(selfEnrolCourseDto);
    return this.httpClient.post<EnrolSelfEnrolUserResponse>(
      selfEnrolRequest.url,
      selfEnrolRequest.formData,
      selfEnrolRequest.queryParams
    );
  }
}
