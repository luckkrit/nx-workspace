import {CoreUserCreateUsersRequest} from './core-user-create-users-request';

describe('CoreUserCreateUsersRequest', () => {
  it('should create an instance', () => {
    expect(new CoreUserCreateUsersRequest({
      username: "",
      password: "",
      email: "",
      firstname: "",
      lastname: ""
    })).toBeTruthy();
  });
});
