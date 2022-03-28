import { BaseRequest } from "./base-request";
import { environment } from "../../../environments/environment";
import { MoodleWsQueryParameters } from "../moodle-ws-query-parameters";
import { MoodleWsFormDataParamters } from "../moodle-ws-form-data-paramters";
import { UserLoginDto } from "../model/user-login-dto";

export class LoginRequest extends BaseRequest {
  constructor({ username, password }: UserLoginDto) {
    super();
    this.url += environment.loginPath;
    this.appendQueryParams({ [MoodleWsQueryParameters.WS_LOGIN_SERVICE]: [MoodleWsQueryParameters.WS_LOGIN_SERVICE_NAME] });
    this.appendFormData(MoodleWsFormDataParamters.WS_USERNAME, username);
    this.appendFormData(MoodleWsFormDataParamters.WS_PASSWORD, password);
  }
}
