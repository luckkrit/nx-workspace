import { environment } from "apps/moodle/src/environments/environment";
import { UserCourseDto } from "../model/user-course-dto";
import { MoodleWsFormDataParamters } from "../moodle-ws-form-data-paramters";
import { MoodleWsFunctions } from "../moodle-ws-functions";
import { MoodleWsQueryParameters } from "../moodle-ws-query-parameters";
import { BaseRequest } from "./base-request";

export class CoreEnrolGetUsersCoursesRequest extends BaseRequest {
    constructor({ token, userId, returnUserCount }: UserCourseDto) {
        super();
        this.url += environment.apiPath;
        this.appendQueryParams({
            [MoodleWsQueryParameters.WS_FUNCTION]: [MoodleWsFunctions.CORE_ENROL_GET_USERS_COURSE],
            [MoodleWsQueryParameters.WS_TOKEN]: token,
        })
        this.appendFormData(MoodleWsFormDataParamters.WS_USERID, userId);
        this.appendFormData(MoodleWsFormDataParamters.WS_RETURNUSERCOUNT, returnUserCount);
    }
}
