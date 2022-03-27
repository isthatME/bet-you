import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Result } from './models/result.model';
import { games } from '../../mocks/gamesMock.mock'
import Chart from 'chart.js/auto';
import { FixturesServiceService } from 'src/app/services/fixtures-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  result: Result[];
  isLoading: boolean;

  @ViewChild('myCanvas', { static: true }) canvas: ElementRef;
  constructor(private fixturesServiceService: FixturesServiceService) { }

  ngOnInit(): void {
    this.getResults();
    this.loadGraph();
    this.fixturesServiceService.getFixtures().subscribe(res => console.log(res))
  }
  getResults(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.result = games;
      this.isLoading = false;
    }, 1500);
  }
  loadGraph(): void {
    new Chart(this.canvas.nativeElement, {
      type: 'line',
      data: {
        labels: ["janeiro", "fevereiro"],
        datasets: [{
          data: [1, 2]
        }]
      }
    })
  }
}
