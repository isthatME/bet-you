import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PredictFixturePayload } from './models/fixture-predict-payload.interface';
import { PredictFixtureResponse } from './models/fixture-predict-response.interface';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  constructor(protected http: HttpClient) { }

  getPredict(body: PredictFixturePayload[]): Observable<PredictFixtureResponse[]> {
    return this.http.post<PredictFixtureResponse[]>(`${environment.api.predictFixtureBaseUrl}/predict`, body)
  }
}
