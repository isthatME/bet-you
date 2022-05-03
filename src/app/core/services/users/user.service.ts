import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginPayload } from './models/login-payload.interface';
import { LoginResponse } from './models/login-response.interface';
import { RegisterResponse } from './models/register-response';
import { RegisterPayload } from './models/register.payload.interface';
import { VoteResponseInterface } from './models/vote-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(protected http: HttpClient) { }

  register(body: RegisterPayload): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${environment.api.userBaseUrl}/register`, body)
  }
  login(body: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.api.userBaseUrl}/login`, body)
  }
  vote(body: any): Observable<VoteResponseInterface> {
    return this.http.post<VoteResponseInterface>(`${environment.api.userBaseUrl}/vote`, body)
  } 
}
