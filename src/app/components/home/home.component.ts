import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { FixturesServiceService } from 'src/app/core/services/fixtures/fixtures-service.service';
import { Result } from 'src/app/core/services/fixtures/models/result.model';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import VotedFixture from 'src/app/core/services/local-storage/models/voted-fixture.interface';
import { User } from 'src/app/core/services/users/models/user.inteface';
import { UserService } from 'src/app/core/services/users/user.service';
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
  currentUser: User;

  constructor(
    private fixturesServiceService: FixturesServiceService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.statisticsData = { winPrediction: 20, drawPrediction: 20, lossPrediction: 60 }
    this.currentUser = JSON.parse(this.localStorageService.getUser());
    this.getResults();

  }
  getVotedFixtures(): void {
    if (this.currentUser && this.localStorageService.getVoted()) {
      let allVotedFixtures = JSON.parse(this.localStorageService.getVoted());
      let userVotedFixturesIndexes = allVotedFixtures.find((votedFixture: VotedFixture) => votedFixture.userId === this.currentUser._id)
      userVotedFixturesIndexes.votedFixtureIndex.map((index: number,) => {
        this.voted[index] = true;
      })
    }
  }
  getResults(): void {
    this.isLoading = true;
    this.fixturesServiceService
      .getFixtures()
      .pipe(take(1))
      .subscribe((res) => {
        this.fixtures = res
        this.fixtureCopy = res
        this.voted = new Array(res.length).fill(false);
        this.isLoading = false;
        this.getVotedFixtures();
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
  vote(fixtureWinner: number, fixtureId: number, fixtureIndex: number): void {
    if (this.currentUser) {
      this.userService
        .vote({ fixtureWinner: fixtureWinner, fixtureId: fixtureId, userId: this.currentUser._id })
        .pipe(take(1))
        .subscribe(res => {
          this.fixtures[fixtureIndex].number_of_votes = res.message.numberOfVotes
          this.localStorageService.saveVote({ userId: this.currentUser._id, votedFixtureIndex: fixtureIndex })
        });
    } else { this.router.navigate(['/login']) }
  }
}
