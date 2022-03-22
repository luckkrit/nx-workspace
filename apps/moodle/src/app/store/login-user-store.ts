import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { MoodleProviderService } from "../services/moodle-provider.service";
import { UserLoginDto } from "../services/model/user-login-dto";
import { catchError, concatMap, delay, EMPTY, Observable, of, switchMap, tap } from "rxjs";
import { Injectable } from "@angular/core";

export interface LoginUserState {
  isSuccess: boolean
  isLoading: boolean
  error: string
}

@Injectable()
export class LoginUserStore extends ComponentStore<LoginUserState> {
  readonly isSuccess$ = this.select(state => state.isSuccess)
  readonly isLoading$ = this.select(state => state.isLoading)
  readonly error$ = this.select(state => state.error)

  constructor(private moodleProviderService: MoodleProviderService) {
    super({ isLoading: false, error: "", isSuccess: false });
  }
  readonly login = this.effect((userLoginDto$: Observable<UserLoginDto>) => userLoginDto$.pipe(switchMap(({ username, password }) => {
    this.patchState({ isLoading: true, error: "", isSuccess: false })
    return this.moodleProviderService.login(username, password).pipe(tapResponse(
      () => {
        this.patchState({ isLoading: false, isSuccess: true, error: "" })
      }
      ,
      (error: string) =>
        this.patchState({ isLoading: false, error, isSuccess: false })

    )
    )
  })))
  // readonly setError = (error: string) => this.patchState({ error })
}
