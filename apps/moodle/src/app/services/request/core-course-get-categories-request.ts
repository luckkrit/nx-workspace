import {BaseRequest} from "./base-request";
import {environment} from "../../../environments/environment";
import {MoodleWsQueryParameters} from "../moodle-ws-query-parameters";
import {MoodleWsFunctions} from "../moodle-ws-functions";

export class CoreCourseGetCategoriesRequest extends BaseRequest {
  constructor(token: string) {
    super();
    this.url += environment.apiPath
    this.appendQueryParams({
      [MoodleWsQueryParameters.WS_FUNCTION]: [MoodleWsFunctions.CORE_COURSE_GET_CATEGORIES],
      [MoodleWsQueryParameters.WS_TOKEN]: token
    });
  }
}
