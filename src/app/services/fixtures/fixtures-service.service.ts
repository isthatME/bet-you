import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from './models/result.model';
@Injectable({
  providedIn: 'root'
})
export class FixturesServiceService {
  readonly BASE_URL = 'https://api.api-futebol.com.br/v1';

  constructor(private http: HttpClient) { }

  getFixtures(): Observable<Result[]> {
    const url = `${this.BASE_URL}`
    return this.http.get<Result[]>(`${url}/ao-vivo`)
  }
}
