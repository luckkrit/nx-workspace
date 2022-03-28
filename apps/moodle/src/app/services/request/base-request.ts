import { HttpParams } from "@angular/common/http";
import { MoodleWsQueryParameters } from "../moodle-ws-query-parameters";
import { environment } from "../../../environments/environment";

export class BaseRequest {
  constructor(public url: string = environment.baseUrl, public formData: FormData = new FormData(), private _queryParams = new HttpParams()) {
    this._queryParams = this._queryParams.appendAll({ [MoodleWsQueryParameters.WS_REST_FORMAT]: [MoodleWsQueryParameters.WS_REST_FORMAT_JSON] })
  }

  appendQueryParams(params: any) {
    this._queryParams = this._queryParams.appendAll(params);
  }

  appendFormData(name: string, value: any) {
    this.formData.append(name, value);
  }

  get queryParams() {
    return { params: this._queryParams }
  }
}
