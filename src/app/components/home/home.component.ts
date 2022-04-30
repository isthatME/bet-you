import { Component, OnInit, } from '@angular/core';
import { FixturesServiceService } from 'src/app/core/services/fixtures/fixtures-service.service';
import { Result } from 'src/app/core/services/fixtures/models/result.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fixtures: Result[];
  fixtureCopy: Result[];
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
        this.fixtureCopy = res
        this.voted = new Array(res.length).fill(false);
        this.isLoading = false;
      })
  }
  identify(_: number, item: Result): number | undefined {
    return item ? item.partida_id : undefined;
  }
  geStandardizedFixtureInfo(fixture: Result): string {
    let fixtureSearchPattern = fixture.slug
      .split('-')
      .filter((_, idx) => idx < 2)
    fixtureSearchPattern
      .splice(1, 0, "x")
    return fixtureSearchPattern.join(' ')
  }
  searchedFixture(searchedFixture: string): void {
    this.searched = true;
    this.fixtures = this.fixtureCopy;
    this.fixtures = this.fixtures.filter(fixture => {
      let fixtureSearchPattern = this.geStandardizedFixtureInfo(fixture)
      return fixtureSearchPattern.toLowerCase().includes(searchedFixture.toLowerCase()) ? fixture : ''
    })

  }
  vote(): void {
    
  }
}
