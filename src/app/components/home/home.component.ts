import { Component, OnInit, } from '@angular/core';
import { FixturesServiceService } from 'src/app/services/fixtures/fixtures-service.service';
import { Result } from 'src/app/services/fixtures/models/result.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fixtures: Result[];
  statisticsData: any
  isLoading: boolean;
  voted: boolean;

  constructor(private fixturesServiceService: FixturesServiceService) { }

  ngOnInit(): void {
    this.statisticsData = { winPrediction: 20, drawPrediction: 20, lossPrediction: 60 }
    this.getResults();

  }
  getResults(): void {
    this.fixturesServiceService.getFixtures()
      .subscribe((res) => {
        this.fixtures = res
        // console.log(res['chave-1'].ida.time_mandante.escudo)
      })
  }
}
