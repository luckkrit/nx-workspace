import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { catchError, concatMap, EMPTY, map, Observable, of, tap } from 'rxjs';
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
        if (typeof token == 'undefined' || token == '') {
          this.router.navigate(['/login']);
        }
        return typeof token != 'undefined' && token.length > 0;
      }),
      catchError((error) => {
        this.router.navigate(['/login']);
        return EMPTY;
      })
    );
  }
}
