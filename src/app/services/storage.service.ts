import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveData<T>(key: string, value: T) {
    if(!localStorage) return;

    let stringifyValue = JSON.stringify(value);
    localStorage.setItem(key, stringifyValue);
  }

  getData<T>(key: string) {
    if(!localStorage) return;

    const value = localStorage.getItem(key);
    if (value === null) {return}

    return JSON.parse(value) as T;
  }

  removeData(key: string) {
    if(!localStorage) return;

    localStorage.removeItem(key);
  }

  clearData() {
    if(!localStorage) return;

    localStorage.clear();
  }
}
