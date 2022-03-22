import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { User } from "./model/user";
import { LocalStorageRefService } from "./local-storage-ref.service";

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  private readonly _initialUser = {
    id: 0,
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    token: ""
  };
  private _userStorage$ = new BehaviorSubject<User>(this._initialUser);
  public userStorage$ = this._userStorage$.asObservable();
  private _localStorage: Storage;

  constructor(private _localStorageRefService: LocalStorageRefService) {
    this._localStorage = _localStorageRefService.localStorage;
  }

  public loadUser() {
    let data = this._localStorage.getItem("user");
    if (data != null) {
      const user = JSON.parse(data);
      this._userStorage$.next(user);
    } else {
      this._userStorage$.error("User not found");
    }
  }

  public saveUser(user: User) {
    this._localStorage.setItem("user", JSON.stringify(user));
    this._userStorage$.next(user);
  }

  public saveToken(token: string) {

    let data = this._localStorage.getItem("user");
    if (data != null) {
      const user = JSON.parse(data);
      user.token = token;
      this.saveUser(user)
    } else {
      this._userStorage$.error("User not found");
    }
  }

  public clearUser() {
    this._localStorage.clear();
    this._userStorage$.next(this._initialUser);
  }
}
