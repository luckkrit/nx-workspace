import {EnrolSelfEnrolUserRequest} from './enrol-self-enrol-user-request';

describe('EnrolSelfEnrolUserRequest', () => {
  it('should create an instance', () => {
    expect(new EnrolSelfEnrolUserRequest({token: "", courseId: 0})).toBeTruthy();
  });
});
