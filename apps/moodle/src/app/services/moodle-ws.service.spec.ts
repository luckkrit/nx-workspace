import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MoodleWsService } from './moodle-ws.service';
import { of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CoreUserCreateUsersResponse } from "./response/core-user-create-users-response";
import { CoreUserCreateUsersRequest } from "./request/core-user-create-users-request";

describe('MoodleWsService', () => {
  let service = jasmine.createSpyObj<MoodleWsService>("MoodleWsService", ["registerUser"]);
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController)
  })


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create user correctly', () => {
    let responseData = [{ id: 1, username: "user1" }];
    let createUserDto = {
      username: "user1",
      password: "Tirk12345=",
      firstname: "Krit",
      lastname: "Chomaitong",
      email: "luckkrit@hotmail.com"
    }

    // Test registerUser function
    service.registerUser.and.returnValue(of(responseData));
    const observer = service.registerUser(createUserDto);
    observer.subscribe({
      next: (response) => {
        expect(response.length).toBeGreaterThan(0);
        expect(response[0].id).toEqual(1);
        expect(response[0].username).toEqual("user1");
        expect(service.registerUser).toHaveBeenCalled();
      }
    });

    // Test HTTP POST Request
    let coreUserCreateUsersRequest = new CoreUserCreateUsersRequest(createUserDto)
    httpClient.post<CoreUserCreateUsersResponse>(coreUserCreateUsersRequest.url, coreUserCreateUsersRequest.formData, coreUserCreateUsersRequest.queryParams).subscribe(
      response => {
        expect(response.length).toEqual(1)
        expect(response[0].id).toEqual(1)
        expect(response[0].username).toEqual("user1")
      }
    )
    // Test url is the same as httpClient
    const req = httpTestingController.expectOne(coreUserCreateUsersRequest.url + `?${coreUserCreateUsersRequest.queryParams.toString()}`);
    expect(req.request.method).toEqual('POST')

    // Simulate response
    req.flush(responseData)

    // Verify that httpClient not request to server
    httpTestingController.verify();
  });
});
