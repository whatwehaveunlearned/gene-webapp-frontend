import {Component, ViewChild,Input,OnChanges,SimpleChanges} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

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


  //Paginators fails with ngIf in the parent components.
  //I need to declare the elements as static false to make them work
  //Also I need to force async call setTimeout in ngOnChanges to engage
  // the paginator and the sort.
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort , {static: false}) sort: MatSort;

  constructor(private router: Router){}

  ngOnChanges(changes:SimpleChanges){
    if(this.data){
      //Assign the values from the columns
      this.displayedColumns = Object.keys(this.data[0]);
      this.createColumnsArray(this.displayedColumns);
      setTimeout(() =>{
        this.renderTable();
      })
    }
  }

  createColumnsArray(columns:Array<string>){
    //Clean Previous Columns
    this.columnsArray = []
    //Order columns recieved from server
    columns.push(columns.splice(columns.indexOf('pubdate'), 1)[0]);
    for (let i = 0; i<columns.length; i++){
      //Push column definition into array
      //Rename columns that need renaming
      let header_name = columns[i]
      if (columns[i]== "journal") header_name = "journal name"
      else if(columns[i]== "pubdate") header_name = "date"
      else if(columns[i]== "publication_types") header_name = "publication type"
      else if(columns[i]== "country") header_name = "origin"
      this.columnsArray.push( {
        columnDef:columns[i],
        header:header_name,
        cell:(element:any) => `${eval('element.' + columns[i])}`,
      })
    }
  }

  renderTable(){
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  rowClick(row:any){
    if(this.router.url.includes('home'))
    {
      let route = '/gene/';
      this.router.navigate([route,row.primary_gene]);
    }else{
      let url = 'https://pubmed.ncbi.nlm.nih.gov/' + row.PubMed_ID
      window.open(url, "_blank");
    }
    // this.router.navigate([route], { queryParams: { id: row.GeneID } });
  }
}
