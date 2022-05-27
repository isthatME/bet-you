import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { FixturesServiceService } from 'src/app/core/services/fixtures/fixtures-service.service';
import { Result } from 'src/app/core/services/fixtures/models/result.model';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import VotedFixture from 'src/app/core/services/local-storage/models/voted-fixture.interface';
import { PredictFixturePayload } from 'src/app/core/services/prediction/models/fixture-predict-payload.interface';
import { PredictionService } from 'src/app/core/services/prediction/prediction.service';
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
  isLoading: boolean;
  searched: boolean;
  voted: boolean[];
  currentUser: User;
  statisticsData: any
  constructor(
    private fixturesServiceService: FixturesServiceService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private predictionService: PredictionService
  ) { }

  ngOnInit(): void {
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
  buildPredictBody(res: Result[]): PredictFixturePayload[] {
    const weekDays = ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo']
    const obj = res.map(res => ({
      rodada: 1,
      dia: weekDays[new Date(res.data_realizacao_iso).getDay()],
      mandante: res.time_mandante.nome_popular,
      visitante: res.time_visitante.nome_popular,
      arena: res.estadio.nome_popular,
      estadom: res.placar,
      estadov: res.placar,
      pontosm: res.placar_mandante,
      pontosv: res.placar_visitante
    }))
    return obj
  }
  getResults(): void {
    this.isLoading = true;
    this.fixturesServiceService
      .getLiveFixtures()
      .pipe(
        take(1)
      )
      .subscribe((res) => {
        const body = this.buildPredictBody(res)
        this.predictionService.getPredict(body)
          .subscribe(predict => {
            this.fixtures = res
            this.fixtures.forEach((res, idx) => {
              res.statisticsData = {
                winPrediction: predict[idx].vitoria_mandante,
                drawPrediction: predict[idx].empate,
                lossPrediction: predict[idx].vitoria_visitante
              }
            })
            this.fixtureCopy = res
            this.voted = new Array(res.length).fill(false);
            this.isLoading = false;
            this.getVotedFixtures();
          })
      })
  }
  identify(_: number, item: Result): number | undefined {
    return item ? item.partida_id : undefined;
  }
  geStandardizedFixtureInfo(fixture: Result): string {
    return `${fixture.time_mandante.nome_popular} x ${fixture.time_visitante.nome_popular}`
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
