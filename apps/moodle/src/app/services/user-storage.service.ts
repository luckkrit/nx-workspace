import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from './model/user';
import { LocalStorageRefService } from './local-storage-ref.service';

export enum UserStorageKeys {
  USER_KEY = 'user',
}

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  private readonly _initialUser = {
    id: 0,
    username: '',
    firstname: '',
    lastname: '',
    token: '',
  };
  private _userStorage$ = new BehaviorSubject<Partial<User>>(this._initialUser);
  public userStorage$ = this._userStorage$.asObservable();
  private _localStorage: Storage;

  constructor(private _localStorageRefService: LocalStorageRefService) {
    this._localStorage = this._localStorageRefService.localStorage;
  }

  public loadUser() {
    let data = this._localStorage.getItem(UserStorageKeys.USER_KEY);
    if (data != null) {
      const user = JSON.parse(data);
      this._userStorage$.next(user);
    } else {
      this._userStorage$.error('User not found');
    }
  }

  public getToken(): Observable<string> {
    return this._userStorage$.pipe(map(({ token }) => {
      if (token) {
        return token;
      } else {
        throw new Error('User not found')
      }
    }))
  }

  public saveUser(user: Partial<User>) {
    this._localStorage.setItem(
      UserStorageKeys.USER_KEY,
      JSON.stringify({
        id: user.id,
        username: user.username,
        token: user.token,
        firstname: user.firstname,
        lastname: user.lastname,
      })
    );
    this._userStorage$.next(user);
  }

  public saveToken(username: string, token: string) {
    let data = this._localStorage.getItem(UserStorageKeys.USER_KEY);
    if (data != null) {
      const user = JSON.parse(data);
      if (user.username != username) {
        this.saveUser({ username, token });
      } else {
        user.token = token;
        this.saveUser(user);
      }
    } else {
      this.saveUser({ username, token });
    }
  }

  public clearUser() {
    this._localStorage.clear();
    this._userStorage$.next(this._initialUser);
  }
}
