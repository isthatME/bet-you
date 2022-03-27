import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FixturesServiceService {
  readonly BASE_URL = 'https://api.api-futebol.com.br/v1/';

  constructor(private http: HttpClient) { }

  getFixtures(): Observable<any> {
    const url = `${this.BASE_URL}`
    return this.http.get(`${url}`)
  }
}
