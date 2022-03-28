import { SelfEnrolCourseDto } from "../model/self-enrol-course-dto";
import { BaseRequest } from "./base-request";
import { environment } from "../../../environments/environment";
import { MoodleWsFormDataParamters } from "../moodle-ws-form-data-paramters";
import { MoodleWsQueryParameters } from "../moodle-ws-query-parameters";
import { MoodleWsFunctions } from "../moodle-ws-functions";

export class EnrolSelfEnrolUserRequest extends BaseRequest {
  constructor({ courseId, token }: SelfEnrolCourseDto) {
    super();
    this.url += environment.apiPath;
    this.appendFormData(MoodleWsFormDataParamters.WS_COURSE_ID, courseId);
    this.appendQueryParams({
      [MoodleWsQueryParameters.WS_FUNCTION]: [MoodleWsFunctions.ENROL_SELF_ENROL_USER],
      [MoodleWsQueryParameters.WS_TOKEN]: token
    });
  }
}
