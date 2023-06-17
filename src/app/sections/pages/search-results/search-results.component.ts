import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router'
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  results: string[] = [];
  search_term:string= '';
  n_results:number = 0;

  constructor(
    private dataService:DataService,
    private activatedRoute:ActivatedRoute,
    ) { }

  ngOnInit(): void {
    //Store Route on landing
    this.search_term = this.activatedRoute.snapshot.params['term']
    //Subscribe to socket state
    this.dataService.dataServiceState.subscribe((state) =>{
      if(state="opened"){
        this.dataService.fetchDataServer('search-results-component',this.search_term,[])
      }
    })


    // Subscribe to socket data
    this.dataService.search_results_component_data.subscribe((data_recieved:any) =>{
      let dataType = data_recieved['type'];
      this.results = JSON.parse(data_recieved['data']);
      this.n_results = this.results.length
    })
  }

}
