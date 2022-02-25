import {Component, ViewChild,Input,OnChanges,SimpleChanges} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges{

  @Input() data:any=[];
  columnsArray:any=[];
  displayedColumns: string[];
  dataSource:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnChanges(changes:SimpleChanges){
    if(this.data){
      //Assign the values from the columns
      this.displayedColumns = Object.keys(this.data[0]);
      this.createColumnsArray(this.displayedColumns);
      this.renderTable();
    }
  }

  createColumnsArray(columns:Array<string>){
    //Clean Columns
    this.columnsArray = []
    for (let i = 0; i<columns.length; i++){
      //Push column definition into array
      this.columnsArray.push( {
        columnDef:columns[i],
        header:columns[i],
        cell:(element:any) => `${eval('element.' + columns[i])}`,
      })
    }
  }

  renderTable(){
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
