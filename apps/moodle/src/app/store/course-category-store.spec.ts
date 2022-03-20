import {CourseCategoryState, CourseCategoryStore} from "./course-category-store";
import {TestBed} from "@angular/core/testing";
import {of, throwError} from "rxjs";

describe("CourseCategoryStore", () => {
  let store: CourseCategoryStore;
  let spyStore = jasmine.createSpyObj<CourseCategoryStore>("CourseCategoryStore", ["getUser", "getCategory", "setState", "select"], ["error$", "categories$"])
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{
        provide: CourseCategoryStore,
        useValue: spyStore
      }]
    })
    store = TestBed.inject(CourseCategoryStore);
    store.setState({categories: [], isLoading: false, error: ""});
    spyStore.setState({categories: [], isLoading: false, error: ""});
  })
  it('should be created', () => {
    expect(store).toBeTruthy()
  })
  it('should not get user', () => {
    spyStore.getUser.and.returnValue(throwError(() => "user not found"));
    spyStore.getUser().subscribe({error: err => expect(err).toEqual("user not found")})
    expect(store.getUser).toHaveBeenCalled()
  })
  it('should get user', () => {
    spyStore.getUser.and.returnValue(of({
      id: 0,
      username: 'user1',
      password: 'Tirk12345=',
      email: 'user1@user.com',
      firstname: 'Krit',
      lastname: 'Chomaitong',
      token: ''
    }));
    store.getUser().subscribe({
      next: (user) => {
        expect(user).toBeTruthy()
        expect(user.email).toEqual("user1@user.com")
      }
    })
  })
  it('should return state error', () => {
    spyStore.select.and.returnValue(throwError(() => "user not found"))
    store.select((s) => s.error).subscribe({
      error: (err => {
        expect(err).toEqual("user not found")
      })
    })
    expect(spyStore.select).toHaveBeenCalled()
  })
  it('should return state with categories', () => {
    spyStore.select.and.returnValue(of([]))
    store.select((s) => s.categories).subscribe({
      next: (s) => {
        expect(s.length).toEqual(0)
      }
    })
    expect(spyStore.select).toHaveBeenCalled()
  })
});
