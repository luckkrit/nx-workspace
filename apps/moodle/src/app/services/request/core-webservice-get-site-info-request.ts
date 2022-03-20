import {BaseRequest} from "./base-request";
import {User} from "../model/user";
import {environment} from "../../../environments/environment";
import {MoodleWsQueryParameters} from "../moodle-ws-query-parameters";
import {MoodleWsFunctions} from "../moodle-ws-functions";

export class CoreWebserviceGetSiteInfoRequest extends BaseRequest {
  constructor(token: string) {
    super();
    this.url += environment.apiPath;
    this.appendQueryParams({
      [MoodleWsQueryParameters.WS_FUNCTION]: [MoodleWsFunctions.CORE_WEBSERVICE_GET_SITE_INFO],
      [MoodleWsQueryParameters.WS_TOKEN]: token
    })
  }
}
