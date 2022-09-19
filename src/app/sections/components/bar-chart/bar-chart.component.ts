import { Component, ElementRef, Input, OnChanges,SimpleChanges, ViewChild, AfterViewInit, LOCALE_ID, Inject } from '@angular/core';

import {formatNumber} from '@angular/common'
import * as d3 from 'd3';
import { html } from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})

export class BarChartComponent implements OnChanges, AfterViewInit {

  // Requires as input data an array of objects either with an ID key or a count key
  @Input() data:any=[];
  @ViewChild('graph') divElement:ElementRef;
  private svg:any;
  max:number;
  private readonly margin_height = 60;
  private readonly margin_width = 60;
  private readonly width = 750 - (this.margin_width * 2);
  private readonly height = 400 - (this.margin_height);
  readonly viewBoxWidth:number = this.width + (this.margin_width * 2);
  readonly viewBoxHeight:number = this.height + (this.margin_height);
  //Threshold for hidding x values in axis
  readonly n_bars_threshold = 30;
  attributes:Array<string>;
  x_value:string;
  y_value:string;
  private barChartType:string = 'default'
  private tickDisplayAttr:string;
  public graphID:string;
  tooltip:any;
  //Font sizes defaults pixels and viewWindows
  private readonly tick_font_small_default_px:number = 11
  private readonly tick_font_big_default_px:number = 15
  private readonly tick_font_small_default_vw:number = 0.75
  private readonly tick_font_big_default_vw:number = 0.95


  constructor(@Inject(LOCALE_ID) public locale: string) { }

  ngOnChanges(changes:SimpleChanges){
    if(this.data){
      console.log("We have data barchart")
      //Get attributes
      this.attributes = Object.keys(this.data[0])
      //Check if we have Symbol attribute
      if (this.attributes.includes('Symbol')){
        this.x_value = "Symbol"
        this.barChartType = 'by_genes'
      }else if(this.attributes.includes('ID')){
        this.x_value = "ID"
        this.barChartType = 'by_years'
      }
      this.createSvg();
      this.drawBars(this.data);
    }
  }

  ngAfterViewInit(){
    //Asign graph ID
    let random = (Math.random() * 1000) + ''
    this.graphID = parseInt(random) + ''
  }

  private createSvg(): void {
    this.svg = d3.select(this.divElement.nativeElement)
    .append("svg")
    // Configure SVG
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', '0 0 ' + this.viewBoxWidth + ' ' + this.viewBoxHeight)
    .append("g")
    .attr("transform", "translate(" + this.margin_width + "," + 5 + ")");
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => eval('d.' + this.x_value)))
    .padding(0.2) ;

    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr('id', (d:any,i:any) =>{
      return 'tick-text-' + this.graphID + '-' + d
    })
    .attr('class','tick-text-' + this.graphID)
    //For the years graph we can hide some tooltips
    //If we have more than 10 years
    .attr("display", (d:any,i:any) => {
      if(this.data.length>this.n_bars_threshold){
        if(i%2!==0 && this.barChartType === 'by_years'){
          return 'none'
        }
        else{
          return 'block'
        }
      }else{
        return 'block'
      }
    })
    .attr("transform", "translate(-10,0)rotate(-45)")
    //Diferent font size for the different graph types
    .style("font-size", (d:any,i:any) => {
      let font_size_value:string = ''
      let font_size_px:number = 0
      let font_size_vw:number = 0
      if(this.barChartType === 'by_years'){
        font_size_px=  this.tick_font_big_default_px
        font_size_vw= this.tick_font_big_default_vw
      }else{
        font_size_px= this.tick_font_small_default_px
        font_size_vw= this.tick_font_small_default_vw
      }
      font_size_value = "min(" + font_size_vw + "vw," + font_size_px+ "px)"
      return font_size_value;
    })
    .style("text-anchor", "end");

    // Create the Y-axis band scale
    this.max = parseInt(''+d3.max(this.data, function(d:any) { return +d.counts;}));
    const y = d3.scaleLinear()
    .domain([0, this.max])
    .range([this.height, this.margin_height/2]);//2 is magic constant
    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y))

    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d:any) => x(eval('d.' + this.x_value)))
    .attr("y", (d:any) => y(d.counts))
    .attr("width", x.bandwidth())
    .attr("height", (d:any) => this.height - y(d.counts))
    .attr("fill", "#90caf9")
    .on('mouseover', (d:any,i:any,n:any) => {
      let n_digits = i.counts.toString().length //We get the n_digits to center the tooltip
      //Depending on bar chart we select proper x parameter
      let x_value:string = this.x_value
      //Highlight bar
      d3.select(d.target)
        .attr("fill", "#ff80ab")
      //Position and fill tooltip based on bars and digits
      // if(this.data.length > this.n_bars_threshold){
      // this.tooltip = this.svg
      //   .append("g")
      //   .attr("class",'tooltip')
      //   .attr("transform", () => {
      //     let pos_x = x(eval('i.' + x_value));
      //     let pos_y = y(i.counts)
      //     if (pos_x == undefined) return null // We need this check to avoid ts error of object might be undefined. See: https://bobbyhadz.com/blog/typescript-object-is-possibly-undefined#:~:text=to%20spot%20bugs.-,The%20%22Object%20is%20possibly%20'undefined'%22%20error%20occurs%20when,not%20undefined%20before%20accessing%20properties.
      //     else{
      //       //center and margin
      //       pos_x = pos_x - ((x.bandwidth() * 1/data.length) + (n_digits * 4))
      //       pos_y = pos_y - (28)
      //       return "translate(" + pos_x + "," + pos_y + ")"
      //     }
      //   })
      // }else{
        this.tooltip = this.svg
        .append("g")
        .attr("class",'tooltip')
        .attr("transform", () => {
          let pos_x = x(eval('i.' + x_value));
          let pos_y = y(i.counts)
          if (pos_x == undefined) return null // We need this check to avoid ts error of object might be undefined. See: https://bobbyhadz.com/blog/typescript-object-is-possibly-undefined#:~:text=to%20spot%20bugs.-,The%20%22Object%20is%20possibly%20'undefined'%22%20error%20occurs%20when,not%20undefined%20before%20accessing%20properties.
          else{
            //center and margin
            pos_x = pos_x + (x.bandwidth()/2) - (n_digits * 4)
            pos_y = pos_y - (28)
            return "translate(" + pos_x + "," + pos_y + ")"
          }
        }) 
      // }
      this.tooltip
        .append("rect")
        .attr("class","tooltip-background")
        //Class does not get apply i dont understand
        .style("stroke-width",1)
        .style("stroke","#ff80ab")
        .attr("width",n_digits * 10)//magic number
        .attr("height",25)//magic number
        .attr("fill","white");
      this.tooltip
        .append("text")
        .attr('class','tooltip-text')
        .attr("x",n_digits * 10/2)//magic number (mid of width)
        .attr("y","15")//magic number (mid of height)
        .attr("dominant-baseline","middle")
        .attr("text-anchor","middle")

        .text(formatNumber(i.counts,this.locale))

      //Select Tick value of that bar chart
      let currentTick = d3.select('#tick-text-' + this.graphID + '-' + eval('i.' + this.x_value));
      //Store the current display value to apply it on mouseout
      this.tickDisplayAttr = currentTick.attr('display');
      //Hide other ticks
      d3.selectAll('.tick-text-' + this.graphID)
        .attr("display","none")
      //Change style of selected tick
      currentTick.attr("display", "block")
        .style("font-size", () => {
          let font_size_value:string = ''
          let font_size_px:number = 0
          let font_size_vw:number = 0
          if(this.barChartType === 'by_years'){
            font_size_px=  this.tick_font_big_default_px + 3
            font_size_vw= this.tick_font_big_default_vw + 0.5
          }else{
            font_size_px= this.tick_font_small_default_px + 3
            font_size_vw= this.tick_font_small_default_vw + 0.5
          }
          font_size_value = "min(" + font_size_vw + "vw," + font_size_px+ "px)"
          return font_size_value;
          "min(1vw, 18px)"
        })
    })
    .on('mouseout', (d:any,i:any,n:any) => {
      //Unfill Bar
      d3.select(d.target)
        .attr("fill", "#90caf9")
      //Clear tooltip
      this.tooltip.remove()
      //UnHide other ticks for years
      //If we have more than n_bars_threshold years
      d3.selectAll('.tick-text-' + this.graphID)
      .attr("display", (d:any,i:any) => {
        if(this.data.length>this.n_bars_threshold){
          if(i%2!==0 && this.barChartType === 'by_years'){
            return 'none'
          }
          else{
            return 'block'
          }
        }else{
          return 'block'
        }
      })
      //Set resized tick in original size
      d3.select('#tick-text-' + this.graphID + '-' + eval('i.' + this.x_value))
      .style("font-size", (d:any,i:any) => {
        let font_size_value:string = ''
        let font_size_px:number = 0
        let font_size_vw:number = 0
        if(this.barChartType === 'by_years'){
          font_size_px=  this.tick_font_big_default_px
          font_size_vw= this.tick_font_big_default_vw
        }else{
          font_size_px= this.tick_font_small_default_px
          font_size_vw= this.tick_font_small_default_vw
        }
        font_size_value = "min(" + font_size_vw + "vw," + font_size_px+ "px)"
        return font_size_value;
      })
        .attr("display", (d:any,i:any) => { return this.tickDisplayAttr })
     })
  }
}
