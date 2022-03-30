import { Injectable } from '@angular/core';

function getSessionStorage(): Storage {
  return sessionStorage;
}

@Injectable({
  providedIn: 'root',
})
export class SessionStorageRefService {
  constructor() {}
  get sessionStorage(): Storage {
    return getSessionStorage();
  }
}
