import { BaseRequest } from './base-request';
import { environment } from '../../../environments/environment';
import { MoodleWsFormDataParamters } from '../moodle-ws-form-data-paramters';
import { CreateUserDto } from '../model/create-user-dto';
import { MoodleWsQueryParameters } from '../moodle-ws-query-parameters';
import { MoodleWsFunctions } from '../moodle-ws-functions';

export class CoreUserCreateUsersRequest extends BaseRequest {
  constructor(createUserDto: CreateUserDto) {
    super();
    this.url += environment.apiPath;
    [createUserDto].forEach(
      ({ username, password, firstname, lastname, email }, i: number) => {
        this.appendFormData(
          `${MoodleWsFormDataParamters.WS_CREATE_USER_KEY}[${i}][username]`,
          username
        );
        this.appendFormData(
          `${MoodleWsFormDataParamters.WS_CREATE_USER_KEY}[${i}][password]`,
          password
        );
        this.appendFormData(
          `${MoodleWsFormDataParamters.WS_CREATE_USER_KEY}[${i}][firstname]`,
          firstname
        );
        this.appendFormData(
          `${MoodleWsFormDataParamters.WS_CREATE_USER_KEY}[${i}][lastname]`,
          lastname
        );
        this.appendFormData(
          `${MoodleWsFormDataParamters.WS_CREATE_USER_KEY}[${i}][email]`,
          email
        );
      }
    );
    // this.appendFormData(MoodleWsFormDataParamters.WS_CREATE_USER_KEY, [
    //   {
    //     username: createUserDto.username,
    //     password: createUserDto.password,
    //     firstname: createUserDto.firstname,
    //     lastname: createUserDto.lastname,
    //     email: createUserDto.email,
    //   },
    // ]);
    this.appendQueryParams({
      [MoodleWsQueryParameters.WS_TOKEN]: environment.serviceToken,
      [MoodleWsQueryParameters.WS_FUNCTION]: [
        MoodleWsFunctions.CORE_USER_CREATE_USERS,
      ],
    });
  }
}
