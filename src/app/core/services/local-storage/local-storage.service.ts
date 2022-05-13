import { Injectable } from '@angular/core';
import { User } from '../users/models/user.inteface';
import Token from './models/token.interface';
import VoteFixture from './models/vote-fixture.interface';
import VotedFixture from './models/voted-fixture.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  getToken(): any {
    return localStorage.getItem('token');
  }
  setToken(token: Token): void {
    localStorage.setItem('token', JSON.stringify(token));
  }
  setUser(user: Omit<User, 'password'>): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
  logout() {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('voted');
    window.location.href = window.location.href
  }
  getUser(): any {
    return localStorage.getItem('user');
  }
  isLoggedIn(): boolean {
    return JSON.parse(this.getToken())?.accesToken ? true : false;
  }
  saveVote(vote: VoteFixture): void {
    let votedFixtures: any = this.getVoted() ? JSON.parse(this.getVoted()) : [];
    let userIndex = votedFixtures?.findIndex((votedFixture: VotedFixture) => votedFixture.userId === vote.userId);
    if (userIndex >= 0) {
      let voteAlreadyRegistered = votedFixtures[userIndex].votedFixtureIndex.find((idx: number) => idx === vote.votedFixtureIndex);
      if (voteAlreadyRegistered == undefined) {
        votedFixtures[userIndex].votedFixtureIndex.push(vote.votedFixtureIndex);
      }
    } else {
      votedFixtures.push({
        userId: vote.userId, votedFixtureIndex: [vote.votedFixtureIndex]
      });
    }
    localStorage.setItem('voted', JSON.stringify(votedFixtures));
  }
  getVoted(): any {
    return localStorage.getItem('voted');
  }
}
