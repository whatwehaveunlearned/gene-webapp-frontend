import { Component, OnInit, Input,OnChanges,SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';
import type { chart } from 'highcharts';

@Component({
  selector: 'app-highchart',
  templateUrl: './highchart.component.html',
  styleUrls: ['./highchart.component.scss']
})
export class HighchartBarComponent implements OnChanges {

  @Input() chartType:string ; // Input property for the chart type
  @Input() dataType: "publications" | "genes" | "authors"; // Input property for the data type
  @Input() data: any; // data Input
  @Input() title:string; // title input
  @Input() xAxisLable:string; // x axis lable input
  @Input() yAxisLable:string;   // y axis lable input
  @Input() seriesName:string; // series name input

  public Highcharts = Highcharts; 
  public chartOptions: Highcharts.Options;
  private xValues:string[];
  private yValues:string[];
  private yAxisFormatter: any; //Function to format yAxis values
  private formatterType:string = 'K'; //Value to hold formatter type

  constructor() {
     exporting(Highcharts); //required for export functionality
     exportData(Highcharts);
     Highcharts.setOptions({
        // lang: {
        //     decimalPoint: '.',
        //     thousandsSep: ',' 
        // },
     });
    }

  ngOnChanges(changes:SimpleChanges){
    this.dataMapping(this.data, this.dataType);
    this.yAxisFormatter = this.YaxisSetFormatter(this.data)
    this.updateChartData(this.data);
  }

  //Function used to map the proper data to the chart
  dataMapping(data:any, dataType: "publications" | "genes" | "authors"){
    if(dataType == "publications"){
        this.xValues = data.map((item:any) => item.ID.toString());
        this.yValues = data.map((item:any) => item.counts);
    }else if(dataType == "genes"){
        this.xValues = data.map((item:any) => item.Symbol.toString());
        this.yValues = data.map((item:any) => item.counts);
    }else if(dataType == "authors"){
        console.log()
    }
  }

  updateChartData(data: Object[]) {
    

    //Need to store the component because you loose access to this
    //context when using the tooltip formatter. Similar to d3. 
    //You can either keep context using => and loose point or do this.
    let component = this;

    this.chartOptions = {
        chart: {
            type: this.chartType
        },
        title: {
            text: this.title,
        },
        xAxis: {
            crosshair: true,
            categories: this.xValues,
            title: {
                text: this.xAxisLable,
            }
        },
        yAxis: {
            crosshair: true,
            min: 0,
            title: {
                text: this.yAxisLable,
                align: 'high'
            },
            labels: {
                formatter: this.yAxisFormatter,
                overflow: 'justify'
            }
        },
        tooltip: {
            // formatter: function () {
            //     let tooltip;
            //     console.log(this);
            //     if(this.y){
            //         if (component.formatterType == 'K') {
            //             tooltip = '<b>' + this.y +' K </b><br/>'
            //         }else{
            //             tooltip = '<b>' + this.y/1000000 +' M </b><br/>'
            //         }
            //     }
            //     return tooltip;
            // }
        },
        plotOptions: {
            [this.chartType]: {
                dataLabels: {
                    enabled: false
                },
                marker: {
                    enabled: false
                }
            }
        },
        series: [{
            type: this.chartType as any,
            showInLegend: false,
            name: this.seriesName, //Name shown on hover and legend
            data: this.yValues,
            lineWidth: 2
        }]
      };
      


  }

  //Set up Yaxis formater based on max values.
  //Formats the yAxis values to be in Million or not
  YaxisSetFormatter(data:any) {
    let function_formatter;
    //Calculate the max value
    const maxValue = data.reduce((max:any, current:any) => {
        return current.counts > max ? current.counts : max;
      }, 0);
    
    if (maxValue > 1000000) {
        this.formatterType = 'M'
        function_formatter = function(that:any) {
            return that.value / 1000000 + ' M';
        }
    }else{
        this.formatterType = 'K'
        function_formatter = function(that:any) {
            return that.value + ' K';
        }
    }
    return function_formatter

    }
}

// const data = [
    //   {counts: 67, ID: 1961},
    //   {counts: 63, ID: 1962},
    //   {counts: 69, ID: 1963},
    //   {counts: 111, ID: 1964},
    //   {counts: 125, ID: 1965}
    // ];