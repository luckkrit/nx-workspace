import { CourseCategories } from "../services/model/course-categories";
import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { catchError, EMPTY, map, mergeMap, Observable, tap } from "rxjs";
import { MoodleProviderService } from "../services/moodle-provider.service";
import { User } from "../services/model/user";
import { Warning } from "../services/model/warning";

export interface CourseCategoryState {
  categories: CourseCategories[]
  isLoading: boolean
  error: string
}

@Injectable()
export class CourseCategoryStore extends ComponentStore<CourseCategoryState> {
  readonly categories$: Observable<CourseCategories[]> = this.select(({ categories }) => categories)
  readonly isLoading$: Observable<boolean> = this.select(({ isLoading }) => isLoading)
  readonly error$: Observable<string> = this.select(({ error }) => error)

  constructor(private moodleProviderService: MoodleProviderService) {
    super({ categories: [], isLoading: false, error: "" });
  }

  getUser(): Observable<User> {
    return this.moodleProviderService.getUser();
  }

  getToken(): Observable<string> {
    return this.moodleProviderService.getToken()
  }

  getCategory = this.effect(() => {
    this.patchState({ isLoading: true, error: "", categories: [] })
    return this.getToken().pipe(tapResponse(
      (token) => this.moodleProviderService.getCourseCategories(token).pipe(tapResponse(
        (categories) => this.patchState({ isLoading: false, categories, error: "" }),
        (error: string) => this.patchState({ isLoading: false, error, categories: [] })
      )), (error: string) => {
        this.patchState({ isLoading: false, error, categories: [] })
      })
    )
  })
}
