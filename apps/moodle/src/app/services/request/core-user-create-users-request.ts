import {BaseRequest} from "./base-request";
import {environment} from "../../../environments/environment";
import {MoodleWsFormDataParamters} from "../moodle-ws-form-data-paramters";
import {CreateUserDto} from "../model/create-user-dto";
import {MoodleWsQueryParameters} from "../moodle-ws-query-parameters";
import {MoodleWsFunctions} from "../moodle-ws-functions";

export class CoreUserCreateUsersRequest extends BaseRequest {
  constructor(createUserDto: CreateUserDto) {
    super();
    this.url += environment.apiPath;
    this.appendFormData(MoodleWsFormDataParamters.WS_CREATE_USER_KEY, [createUserDto]);
    this.appendQueryParams({
      [MoodleWsQueryParameters.WS_TOKEN]: environment.serviceToken,
      [MoodleWsQueryParameters.WS_FUNCTION]: [MoodleWsFunctions.CORE_USER_CREATE_USERS]
    });
  }
}
