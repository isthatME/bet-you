import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from './models/result.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FixturesServiceService {

  constructor(private http: HttpClient) { }

  getLiveFixtures(): Observable<Result[]> {
    return this.http.get<Result[]>(`${environment.api.fixturesBaseUrl}/ao-vivo`)
  }
}
