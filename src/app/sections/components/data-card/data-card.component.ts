import { Component, OnInit, Input } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.scss']
})
export class DataCardComponent implements OnInit {

  @Input() title:string = ''
  @Input() data:any = ''

  table:boolean = true;
  barChart:boolean = false;

  tableData:any;
  histData:any;

  selectedValue : string = "table";

  constructor() { }

  ngOnInit(): void {
    console.log('here')
  }

  changeView(item:MatButtonToggleChange){
    if(item.value === 'table'){
      this.table = true;
      this.barChart = false;
    }else{
      this.table = false;
      this.barChart = true;
    }
    console.log(item.value)
  }

}
