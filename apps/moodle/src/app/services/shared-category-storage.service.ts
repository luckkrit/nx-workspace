import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CourseCategories } from './model/course-categories';
import { SessionStorageRefService } from './session-storage-ref.service';

export enum SessionStorageKeys {
  CATEGORY_KEYS = 'category',
}

@Injectable({
  providedIn: 'root',
})
export class SharedCategoryStorageService {
  private _courseCategoryStorage$ = new BehaviorSubject<CourseCategories>({
    id: 0,
    name: '',
    description: '',
    descriptionformat: 0,
    parent: 0,
    sortorder: 0,
    coursecount: 0,
    depth: 0,
    path: '',
  });
  public courseCategoryStorage$ = this._courseCategoryStorage$.asObservable();
  private sessionStorage: Storage;
  private isLoad = false;
  constructor(private _sessionStorageRefService: SessionStorageRefService) {
    this.sessionStorage = this._sessionStorageRefService.sessionStorage;
    if (!this.isLoad) {
      this.isLoad = true;
      this.loadCategory();
    }
  }

  public setCategory(courseCategories: CourseCategories) {
    this.sessionStorage.setItem(
      SessionStorageKeys.CATEGORY_KEYS,
      JSON.stringify(courseCategories)
    );
    this._courseCategoryStorage$.next(courseCategories);
  }

  public loadCategory() {
    const courseCategoryString = this.sessionStorage.getItem(
      SessionStorageKeys.CATEGORY_KEYS
    );
    if (courseCategoryString) {
      const courseCategory = JSON.parse(courseCategoryString);
      this._courseCategoryStorage$.next(courseCategory);
    } else {
      this._courseCategoryStorage$.error('no category found');
      this._courseCategoryStorage$.complete();
      this._courseCategoryStorage$ = new BehaviorSubject<CourseCategories>({
        id: 0,
        name: '',
        description: '',
        descriptionformat: 0,
        parent: 0,
        sortorder: 0,
        coursecount: 0,
        depth: 0,
        path: '',
      });
      this.courseCategoryStorage$ = this._courseCategoryStorage$.asObservable();
    }
  }
}
