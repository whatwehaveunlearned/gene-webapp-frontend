import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router'
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-gene',
  templateUrl: './gene.component.html',
  styleUrls: ['./gene.component.scss']
})
export class GeneComponent implements OnInit {

  //Title of the page
  public title:string = "test";

  //Gene Searched
  private gene:string = '8989';

  //data from server
  public data:Object;

  //Data for sections
  public dataPublications:Object;
  public dataHistogram:Object;

  //active Route
  // activeRouteString:string =''

  constructor(
    private dataService:DataService,
    private activatedRoute:ActivatedRoute,
    private router:Router
    ){}

  ngOnInit(): void {
    //Subscribe to socket state
    this.dataService.dataServiceState.subscribe((state) =>{
      if(state="opened"){
        //Store Route on landing
        this.gene = this.activatedRoute.snapshot.params['gene']
        this.dataService.fetchDataServer('search_gene',this.gene)
        //Subscribe to router to detect URL changes
        this.router.events.subscribe((event) => {
        // When we do a search URL updates and we fetch data from server 
        if(event instanceof NavigationEnd) {
          //update new gene when route changes
          this.gene = this.activatedRoute.snapshot.params['gene']
          this.dataService.fetchDataServer('search_gene',this.gene)
        }
        });
      }
    })

    //Subscribe to socket data
    this.dataService.data.subscribe((data_recieved:any) =>{
      let dataType = data_recieved['type'];
      this.data = JSON.parse(data_recieved['data']);
      if(dataType === 'table_data'){
        this.dataPublications = this.data;
      }else if(dataType === 'hist_data'){
        this.dataHistogram = this.data;
      }
    })
  }

}
