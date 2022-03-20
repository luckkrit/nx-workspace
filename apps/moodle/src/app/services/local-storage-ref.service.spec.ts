import {TestBed} from '@angular/core/testing';

import {LocalStorageRefService} from './local-storage-ref.service';


interface ObjectLiteral {
  [key: string]: any;
}


describe('LocalStorageRefService', () => {
  let service: LocalStorageRefService;
  beforeEach(() => {
    let store: ObjectLiteral = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);

    TestBed.configureTestingModule({
      imports: [],
      providers: [LocalStorageRefService]
    })

    service = TestBed.inject(LocalStorageRefService);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get localStorage', () => {
    spyOnProperty(service, 'localStorage', 'get').and.returnValue(localStorage)
    expect(service).toBeTruthy()
  })

  it('should get item after set item', () => {
    spyOnProperty(service, 'localStorage', 'get').and.returnValue(localStorage)
    service.localStorage.setItem("test", "test")
    const test = service.localStorage.getItem("test")
    expect(test).toEqual("test")
  })
});
