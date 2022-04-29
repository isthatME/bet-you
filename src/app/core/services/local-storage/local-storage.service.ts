import { Injectable } from '@angular/core';
import { User } from '../users/models/user.inteface';
import Token from './models/token.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  getToken(): any {
    return localStorage.getItem('token');
  }
  setToken(token: Token): void {
    localStorage.setItem('token', JSON.stringify(token));
  }
  setUser(user: Omit<User, 'password'>): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
  logout() {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    window.location.href = window.location.href
  }
  getUser(): any {
    return localStorage.getItem('user');
  }
  isLoggedIn(): boolean {
    return JSON.parse(this.getToken())?.accesToken ? true : false;
  }
}
