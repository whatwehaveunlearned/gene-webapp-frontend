import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  //Author Searched
  public authorID:string = '8989';
  public geneSymbol:string=''

  //data from server
  public data:Object;

  //Data for sections
  // public gene_info:any;
  public all_publications:any;
  public histogram_all_publications:any;

  constructor(
    private dataService:DataService,
    private activatedRoute:ActivatedRoute,
  )
  {}

  ngOnInit(): void {
    //Store Route on landing
    this.authorID = this.activatedRoute.snapshot.params['author']
    // //Subscribe to socket state
    // this.dataService.dataServiceState.subscribe((state) =>{
    //   if(state="opened"){
    //     this.dataService.fetchDataServer('get_author_info',this.authorID)
    //   }
    // })

    // // Subscribe to socket data
    // this.dataService.author_component_data.subscribe((data_recieved:any) =>{
    //   let dataType = data_recieved['type'];
    //   this.data = JSON.parse(data_recieved['data']);
    //   switch (dataType) {
    //     case 'histogram_all_publications':
    //       this.histogram_all_publications = this.data;
    //       break;
    //     case 'all_publications':
    //       this.all_publications = this.data;
    //       break;
    //     default:
    //       console.log('Error: Not a valid option') 
    //   }
    // })
  }
}
