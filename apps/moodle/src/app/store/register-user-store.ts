import { ComponentStore } from "@ngrx/component-store";
import { MoodleProviderService } from "../services/moodle-provider.service";
import { CreateUserDto } from "../services/model/create-user-dto";
import { EMPTY, tap } from "rxjs";
import { Injectable } from "@angular/core";

export interface RegisterUserState {
  isSuccess: boolean
  isLoading: boolean
  error: string
}

@Injectable()
export class RegisterUserStore extends ComponentStore<RegisterUserState> {
  readonly isSuccess$ = this.select(state => state.isSuccess)
  readonly isLoading$ = this.select(state => state.isLoading)
  readonly error$ = this.select(state => state.error)

  constructor(private moodleProviderService: MoodleProviderService) {
    super({ isSuccess: false, isLoading: false, error: "" });
  }

  readonly register = this.effect(({ username, password, firstname, lastname, email }: CreateUserDto) => {
    if (typeof username == 'undefined' || typeof password == 'undefined' || typeof firstname == 'undefined' || typeof lastname == 'undefined' || typeof email == 'undefined') {
      return EMPTY
    } else {
      this.patchState({ isLoading: true, isSuccess: false, error: "" })
      return this.moodleProviderService.registerUser(username, password, firstname, lastname, email).pipe(tap({
        next: () => this.patchState({ isSuccess: true, isLoading: false, error: "" }),
        error: (err => {
          this.patchState({ isLoading: false, isSuccess: false, error: err })
        })
      }))
    }
  })
}
