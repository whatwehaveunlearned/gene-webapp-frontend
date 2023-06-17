import {Component, ViewChild,Input,OnChanges,SimpleChanges} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

import {animate, state, style, transition, trigger} from '@angular/animations';

import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnChanges{

  @Input() data:any=[];
  columnsArray:any=[];
  columns:string[] = [];
  dataAttr: string[];
  dataSource:MatTableDataSource<any>;
  showFilter:boolean = false;
  expandedElement: "PeriodicElement";
  table_type:string='default'


  //Paginators fails with ngIf in the parent components.
  //I need to declare the elements as static false to make them work
  //Also I need to force async call setTimeout in ngOnChanges to engage
  // the paginator and the sort.
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort , {static: false}) sort: MatSort;

  constructor(
    private router: Router,
    private dataService:DataService
    ){}

  ngOnChanges(changes:SimpleChanges){
    //Show filter for results table
    if (this.router.url.includes('results')){
      this.showFilter = true;
    }
    if(this.data){
      //Assign the values from the columns
      this.dataAttr = Object.keys(this.data[0]);
      this.createColumnsArray(this.dataAttr);
      setTimeout(() =>{
        this.renderTable();
      })
    }
  }

  createColumnsArray(columns:Array<string>){
    //Clean Previous Columns
    this.columnsArray = []
    //Order columns recieved from server
    // if(columns.indexOf('pubdate')){
    if(columns.indexOf('pubdate')!==-1){
      // columns.push(columns.splice(columns.indexOf('pubdate'), 1)[0]);
      this.table_type = 'paper_table'
    }
    for (let i = 0; i<columns.length; i++){
      //Push column definition into array
      //Rename columns that need renaming
      let header_name = columns[i]
      if (header_name== "journal") header_name = "journal name"
      else if(header_name== "pubdate") header_name = "date"
      else if(header_name== "primary_gene") header_name = "gene"
      else if(header_name== "publication_types") header_name = "publication type"
      else if(header_name== "country") header_name = "origin"
      else if(header_name== "counts") header_name = "publications"
      this.columns.push(columns[i])
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  rowClick(row:any){
    if(this.table_type=="default"){
      if(row.Symbol)
      {
        let route = '/gene/';
        // if(row.primary_gene){ //primary_gene (in subsection tables)
        this.dataService.getPrimaryGeneFromSymbolGroup(row.Symbol).subscribe({
          next: (response) => {
            console.log('Primary gene:', response.primary_gene);
            let url = route + response.primary_gene
            window.open(url, '_blank')
          },
          error: (error) => {
            console.error('Error:', error);
          }
        });
      }else if(row.PubMed_ID){
        let url = 'https://pubmed.ncbi.nlm.nih.gov/' + row.PubMed_ID
        window.open(url, "_blank");
      }else if(row.Author){
        let url = '/author/' + row.Author;
        window.open(url, '_blank');
        // this.router.navigate([route,row.authors]);
      }
      // this.router.navigate([route], { queryParams: { id: row.GeneID } });
    }
  }
}
