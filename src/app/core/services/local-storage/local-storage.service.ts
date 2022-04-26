import { Injectable } from '@angular/core';
import Token from './models/token.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  getToken(): void {
    console.log(localStorage.getItem('token'))
  }
  setToken(token: Token): void {
    localStorage.setItem('token', JSON.stringify(token))
  }
}
