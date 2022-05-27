import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { StatisticsData } from 'src/app/core/services/fixtures/models/result.model';

@Component({
  selector: 'app-statistics-graph',
  templateUrl: './statistics-graph.component.html',
  styleUrls: ['./statistics-graph.component.css']
})
export class StatisticsGraphComponent implements OnInit, AfterViewInit {
  @Input() statisticsData: StatisticsData;
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
    this.winningPercentage.nativeElement.style.width = `${this.statisticsData.winPrediction * 100}%`;
    this.winningPercentage.nativeElement.style.backgroundColor = '#28a743';
    this.winningPercentage.nativeElement.style.marginRight = '4px';
    this.drawPercentage.nativeElement.style.width = `${this.statisticsData.drawPrediction* 100}%`;
    this.drawPercentage.nativeElement.style.backgroundColor = 'grey';
    this.drawPercentage.nativeElement.style.marginRight = '4px';
    this.lossPercentage.nativeElement.style.width = `${this.statisticsData.lossPrediction * 100}%`;
    this.lossPercentage.nativeElement.style.backgroundColor = 'grey';
  }
}
