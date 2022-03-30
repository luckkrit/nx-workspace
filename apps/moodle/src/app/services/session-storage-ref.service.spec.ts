import { TestBed } from '@angular/core/testing';

import { SessionStorageRefService } from './session-storage-ref.service';

describe('SessionStorageRefService', () => {
  let service: SessionStorageRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorageRefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
