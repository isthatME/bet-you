import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { User } from 'src/app/core/services/users/models/user.inteface';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean;
  currentUser: Omit<User, 'password'>;
  constructor(
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.checkUserLoggedIn();
  }
  checkUserLoggedIn(): void {
    this.isLoggedIn = this.localStorageService.isLoggedIn();
    this.currentUser = JSON.parse(this.localStorageService.getUser());
  }
  logout(): void {
    this.localStorageService.logout();
  }
}
