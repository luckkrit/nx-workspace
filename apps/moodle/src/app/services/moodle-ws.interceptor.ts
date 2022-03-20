import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {MoodleWsQueryParameters} from "./moodle-ws-query-parameters";
import {MoodleWsFunctions} from "./moodle-ws-functions";

export class MoodleWsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (Array.isArray(event.body) && event.body.length == 0) {
          let wsFunction = req.params.get(MoodleWsQueryParameters.WS_FUNCTION);
          if (wsFunction == MoodleWsFunctions.CORE_COURSE_GET_CATEGORIES) {
            throw Error("Categories not found");
          }
          if (wsFunction == MoodleWsFunctions.CORE_USER_CREATE_USERS) {
            throw Error("User not create");
          }
        }
        if (event.body.exception || event.body.error) {
          throw Error(JSON.stringify(event.body));
        }
      }
      return event;
    }));
  }
}
