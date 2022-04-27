import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.checkUserLoggedIn();
  }
  checkUserLoggedIn(): void {
    this.isLoggedIn = this.localStorageService.isLoggedIn();
  }
  logout(): void {
    this.localStorageService.logout();
  }
}
