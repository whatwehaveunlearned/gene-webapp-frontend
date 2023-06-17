import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-highchart-bar',
  templateUrl: './highchart-bar.component.html',
  styleUrls: ['./highchart-bar.component.scss']
})
export class HighchartBarComponent implements OnInit {

  public Highcharts = Highcharts; 
  public chartOptions: Highcharts.Options = {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Your Chart Title'
    },
    xAxis: {
        categories: [],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Counts',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [{
        type: 'bar',
        name: 'Counts',
        data: []
    }]
  };

  constructor() { }

  ngOnInit(): void {
    const data = [
      {counts: 67, ID: 1961},
      {counts: 63, ID: 1962},
      {counts: 69, ID: 1963},
      {counts: 111, ID: 1964},
      {counts: 125, ID: 1965}
    ];
    this.updateChartData(data);
  }

  updateChartData(data: { counts: number, ID: number }[]) {
    const categories = data.map(item => item.ID.toString());
    const counts = data.map(item => item.counts);

    this.chartOptions.xAxis = {
        categories: categories,
        title: {
            text: null
        }
    };

    this.chartOptions.series = [{
        type: 'bar',
        name: 'Counts',
        data: counts
    }];
  }

}
