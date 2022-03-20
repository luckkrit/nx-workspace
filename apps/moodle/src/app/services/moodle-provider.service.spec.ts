import {TestBed} from '@angular/core/testing';

import {MoodleProviderService} from './moodle-provider.service';
import {MoodleWsService} from "./moodle-ws.service";
import {of} from "rxjs";

describe('MoodleProviderService', () => {
  let service = jasmine.createSpyObj<MoodleProviderService>("MoodleProviderService", ["registerUser", "getUser", "getToken"]);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create user correctly', () => {
    service.registerUser.and.returnValue(of({
      username: "user1",
      id: 1,
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      token: ""
    }));
    const observer = service.registerUser(
      "user1",
      "Tirk12345=",
      "Krit",
      "Chomaitong",
      "luckkrit@hotmail.com"
    );
    observer.subscribe({
      next: (user) => {
        expect(user.id).toEqual(1);
        expect(user.username).toEqual("user1");
        expect(service.registerUser).toHaveBeenCalled();
      }, error: (err => {
        expect(err).toBeDefined()
        console.log(err)
      })
    });

  })
  it('should return token', () => {
    service.getToken.and.returnValue(of("token"));
    const observer = service.getToken();
    observer.subscribe({
      next: (token) => {
        expect(token).toEqual("token");
        expect(service.getToken).toHaveBeenCalled()
      },
      error: (err => {
        expect(err).toBeDefined()
        console.log(err);
      })
    });
  })
});
