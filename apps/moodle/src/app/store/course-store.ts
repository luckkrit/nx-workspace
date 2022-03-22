import { Injectable } from "@angular/core";
import { Course } from "../services/model/course";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { EMPTY, mergeMap, Observable, tap } from "rxjs";
import { MoodleProviderService } from "../services/moodle-provider.service";
import { User } from "../services/model/user";
import { Warning } from "../services/model/warning";

export interface CourseState {
  warnings: Warning[]
  courses: Course[]
  isLoading: boolean
  error: string
}

@Injectable()
export class CourseStore extends ComponentStore<CourseState> {
  readonly courses$: Observable<Course[]> = this.select(state => state.courses)
  readonly isLoading$: Observable<boolean> = this.select(state => state.isLoading)
  readonly error$: Observable<string> = this.select(state => state.error)

  constructor(private moodleProviderService: MoodleProviderService) {
    super({ courses: [], isLoading: false, error: "", warnings: [] });
  }

  getUser(): Observable<User> {
    return this.moodleProviderService.getUser();
  }

  getToken(): Observable<string> {
    return this.moodleProviderService.getToken()
  }

  readonly getCourse = this.effect((categoryId: number) => {
    if (typeof categoryId == 'undefined') {
      return EMPTY
    } else {
      this.patchState({ isLoading: true, error: '', courses: [], warnings: [] })
      return this.getToken().pipe(tapResponse(
        (token) =>
          this.moodleProviderService.getCourseByField(token, categoryId).pipe(tapResponse(
            (courseWarning) => this.patchState({
              courses: courseWarning.courses,
              warnings: courseWarning.warnings,
              isLoading: false,
              error: ""
            }),
            (error: string) => this.patchState({ isLoading: false, error, courses: [], warnings: [] })
          ))
        , ((error: string) =>
          this.patchState({ isLoading: false, error, courses: [], warnings: [] })
        )
      ))
    }
  })
}
