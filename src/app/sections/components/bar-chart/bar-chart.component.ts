import { Component, Input, OnChanges,SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnChanges {

  @Input() data:any=[];
  private svg:any;
  max:number;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  viewBoxWidth:number = this.width + (this.margin * 2);
  viewBoxHeight:number = this.height + (this.margin * 2);


  constructor() { }

  ngOnChanges(changes:SimpleChanges){
    if(this.data.length > 0){
      console.log("We have data barchart")
      d3.selectAll('svg').remove();
      this.createSvg();
      this.drawBars(this.data);
    }
  }

  private createSvg(): void {
    this.svg = d3.select("#bar")
    // .style("width", this.width + (this.margin * 2) +'px')
    // .style("height", this.height + (this.margin * 2)+'px')
    .append("svg")
    // .attr("width", this.width + (this.margin * 2))
    // .attr("height", this.height + (this.margin * 2))
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', '0 0 ' + this.viewBoxWidth + ' ' + this.viewBoxHeight)
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.year))
    .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Create the Y-axis band scale
    this.max = parseInt(''+d3.max(this.data, function(d:any) { return +d.pubdate;}));
    const y = d3.scaleLinear()
    .domain([0, this.max])
    .range([this.height, 0]);
    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d:any) => x(d.year))
    .attr("y", (d:any) => y(d.pubdate))
    .attr("width", x.bandwidth())
    .attr("height", (d:any) => this.height - y(d.pubdate))
    .attr("fill", "#d04a35");
  }

}
