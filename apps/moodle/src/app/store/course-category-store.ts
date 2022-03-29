import { CourseCategories } from '../services/model/course-categories';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  catchError,
  EMPTY,
  map,
  mergeMap,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { MoodleProviderService } from '../services/moodle-provider.service';
import { User } from '../services/model/user';
import { Warning } from '../services/model/warning';
import { toErrorString } from '../util/error-converter';

export interface CourseCategoryState {
  categories: CourseCategories[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string;
}

@Injectable()
export class CourseCategoryStore extends ComponentStore<CourseCategoryState> {
  readonly categories$ = this.select(({ categories }) => categories);
  readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  readonly isSuccess$ = this.select(({ isSuccess }) => isSuccess);
  readonly isError$ = this.select(({ isError }) => isError);
  readonly error$ = this.select(({ error }) => error);

  constructor(private moodleProviderService: MoodleProviderService) {
    super({
      categories: [],
      isLoading: false,
      error: '',
      isSuccess: false,
      isError: false,
    });
  }

  private readonly getToken = (): Observable<string> => {
    return this.moodleProviderService.getToken().pipe(
      catchError((error) => {
        this.patchState({
          isLoading: false,
          error,
          categories: [],
          isError: true,
          isSuccess: false,
        });
        return EMPTY;
      })
    );
  };

  readonly getCategory = () =>
    this.effect(() => {
      this.patchState({
        isLoading: true,
        isError: false,
        isSuccess: false,
        error: '',
        categories: [],
      });
      return this.getToken().pipe(
        switchMap((token) => {
          return this.moodleProviderService.getCourseCategories(token).pipe(
            tapResponse(
              (categories) => {
                console.log(categories);
                this.patchState({
                  isLoading: false,
                  isSuccess: true,
                  isError: false,
                  categories,
                  error: '',
                });
              },
              (error: string | Error) => {
                this.patchState({
                  isLoading: false,
                  isSuccess: false,
                  isError: true,
                  error: toErrorString(error),
                  categories: [],
                });
              }
            )
          );
        }),
        catchError((error: string | Error) => {
          this.patchState({
            isLoading: false,
            isSuccess: false,
            isError: true,
            error: toErrorString(error),
            categories: [],
          });
          return EMPTY;
        })
      );
    });
}
