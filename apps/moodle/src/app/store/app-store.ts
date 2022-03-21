import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { switchMap, tap } from "rxjs";
import { MoodleProviderService } from "../services/moodle-provider.service";

export interface AppState {
    isRegister: boolean
    isInit: boolean
}
@Injectable()
export class AppStore extends ComponentStore<AppState> {

    constructor(private moodleProviderService: MoodleProviderService) {
        super({ isRegister: false, isInit: true })
    }
    readonly getUser = this.effect(() => this.moodleProviderService.getUser().pipe(tap({ next: (user) => this.patchState({ isRegister: true, isInit: false }), error: (error) => this.patchState({ isRegister: false, isInit: false }) })))
}