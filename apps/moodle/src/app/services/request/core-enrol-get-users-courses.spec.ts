import { CoreEnrolGetUsersCoursesRequest } from './core-enrol-get-users-courses-request';

describe('CoreEnrolGetUsersCourses', () => {
  it('should create an instance', () => {
    expect(new CoreEnrolGetUsersCoursesRequest(3, "", 0)).toBeTruthy();
  });
});
