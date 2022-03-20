import {HttpParams} from "@angular/common/http";
import {MoodleWsQueryParameters} from "../moodle-ws-query-parameters";
import {environment} from "../../../environments/environment";

export class BaseRequest {
  constructor(public url: string = environment.baseUrl, public formData: FormData = new FormData(), public queryParams = new HttpParams()) {
    this.queryParams = this.queryParams.appendAll({[MoodleWsQueryParameters.WS_REST_FORMAT]: [MoodleWsQueryParameters.WS_REST_FORMAT_JSON]})
  }

  appendQueryParams(params: any) {
    this.queryParams = this.queryParams.appendAll(params);
  }

  appendFormData(name: string, value: any) {
    this.formData.append(name, value);
  }
}
