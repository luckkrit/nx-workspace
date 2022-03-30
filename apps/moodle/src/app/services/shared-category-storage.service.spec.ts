import { TestBed } from '@angular/core/testing';

import { SharedCategoryStorageService } from './shared-category-storage.service';

describe('SharedCategoryStorageService', () => {
  let service: SharedCategoryStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedCategoryStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
