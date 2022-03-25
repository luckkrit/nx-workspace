import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { catchError, EMPTY, map, Observable, of } from 'rxjs';
import { MoodleProviderService } from './services/moodle-provider.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private moodleProviderService: MoodleProviderService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.moodleProviderService.getToken().pipe(
      map((token) => {
        return typeof token != 'undefined' && token.length > 0;
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return EMPTY;
      })
    );
  }
}
