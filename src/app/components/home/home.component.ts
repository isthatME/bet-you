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
  searched: boolean;
  voted: boolean[];

  constructor(private fixturesServiceService: FixturesServiceService) { }

  ngOnInit(): void {
    this.statisticsData = { winPrediction: 20, drawPrediction: 20, lossPrediction: 60 }
    this.getResults();

  }
  getResults(): void {
    this.isLoading = true;
    this.fixturesServiceService.getFixtures()
      .subscribe((res) => {
        this.fixtures = res
        this.voted = new Array(res.length).fill(false);
        this.isLoading = false;
        // console.log(res['chave-1'].ida.time_mandante.escudo)
      })
  }
  identify(_: number, item: Result): number | undefined {
    return item ? item.partida_id : undefined;
  }
  searchedFixture(searchedFixture: string): void {
    this.searched = true;
    this.fixtures = this.fixtures.filter(fixture => fixture.time_mandante.nome_popular.toLowerCase().includes(searchedFixture.toLowerCase()))
  }
}
