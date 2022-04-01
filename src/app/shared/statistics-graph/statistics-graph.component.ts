import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-statistics-graph',
  templateUrl: './statistics-graph.component.html',
  styleUrls: ['./statistics-graph.component.css']
})
export class StatisticsGraphComponent implements OnInit, AfterViewInit {
  @Input() statisticsData: any;
  constructor() { }

  @ViewChild('winningPercentage') winningPercentage: ElementRef;
  @ViewChild('drawPercentage') drawPercentage: ElementRef;
  @ViewChild('lossPercentage') lossPercentage: ElementRef;

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.loadStatistics();
  }
  loadStatistics(): void {
    this.winningPercentage.nativeElement.style.width = `${this.statisticsData.chancesOfWinning}%`;
    this.winningPercentage.nativeElement.style.backgroundColor = '#28a743';
    this.winningPercentage.nativeElement.style.marginRight = '4px';
    this.drawPercentage.nativeElement.style.width = `${this.statisticsData.drawChances}%`;
    this.drawPercentage.nativeElement.style.backgroundColor = 'grey';
    this.drawPercentage.nativeElement.style.marginRight = '4px';
    this.lossPercentage.nativeElement.style.width = `${this.statisticsData.chancesOfLosing}%`;
    this.lossPercentage.nativeElement.style.backgroundColor = 'grey';
    //   new Chart(this.canvas.nativeElement, {
    //     type: 'doughnut',
    //     data: {
    //       datasets: [{
    //         label: 'My First Dataset',
    //         data: [80, 20],
    //         backgroundColor: [
    //           'grey',
    //           'white',
    //         ],
    //         borderWidth: 0,
    //         hoverOffset: 0
    //       }]
    //     }
    //   })
    // }
  }
}
