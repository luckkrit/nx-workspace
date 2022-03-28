import { BaseRequest } from "./base-request";
import { GetCourseByFieldDto } from "../model/get-course-by-field-dto";
import { environment } from "../../../environments/environment";
import { MoodleWsFormDataParamters } from "../moodle-ws-form-data-paramters";
import { MoodleWsQueryParameters } from "../moodle-ws-query-parameters";
import { MoodleWsFunctions } from "../moodle-ws-functions";

export class CoreCourseGetCoursesByFieldRequest extends BaseRequest {
  constructor({ token, field }: GetCourseByFieldDto) {
    super();
    const { type, value } = field;
    this.url += environment.apiPath;
    this.appendFormData(MoodleWsFormDataParamters.WS_GET_COURSE_KEY, type.toString());
    this.appendFormData(MoodleWsFormDataParamters.WS_GET_COURSE_VALUE, value);
    this.appendQueryParams({
      [MoodleWsQueryParameters.WS_FUNCTION]: [MoodleWsFunctions.CORE_COURSE_GET_COURSES_BY_FIELD],
      [MoodleWsQueryParameters.WS_REST_FORMAT]: [MoodleWsQueryParameters.WS_REST_FORMAT_JSON],
      [MoodleWsQueryParameters.WS_TOKEN]: token
    });
  }
}
