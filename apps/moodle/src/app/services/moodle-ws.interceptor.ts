import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { MoodleWsQueryParameters } from "./moodle-ws-query-parameters";
import { MoodleWsFunctions } from "./moodle-ws-functions";

@Injectable()
export class MoodleWsInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
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
          if (event.body.exception) {
            if (event.body.errorcode == "invalidtoken") {
              this.router.navigateByUrl('/login')
            }
          }
          throw Error(JSON.stringify(event.body));
        }
      }
      return event;
    }), catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.error instanceof ErrorEvent) {
          return throwError(() => err.error.error)
        } else {
          return throwError(() => err.status + ":" + err.statusText);
        }
      }
      return throwError(() => err)
    }));
  }
}
/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";


/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: MoodleWsInterceptor, multi: true },
];