import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router'
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //Title of the page
  public title:string = "test";

  //Titles of the sections
  public section_title:Array<string>=["Publications"]

  //Gene Searched
  private gene:string = '8989';

  //data from server
  public data:Object;

  //Data for sections
  public dataPublications:Object;
  public dataHistogram:Object;

  //type of home overview or gene_search
  homeType:string=''

  //active Route
  activeRouteString:string =''

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
        this.activeRouteString = this.activatedRoute.snapshot.params['gene']
        this.overviewOrGene();
        //Subscribe to router to detect URL changes
        this.router.events.subscribe((event) => {
          // When we do a search URL updates and we fetch data from server 
          if(event instanceof NavigationEnd) {
            //update new route when it changes
            this.activeRouteString = this.activatedRoute.snapshot.params['gene']
            this.overviewOrGene()
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

  overviewOrGene(){
    //Assign title to page based on URL parameter on Landing 
    this.title = this.activeRouteString
    //If we searched for a gene
    if(this.activatedRoute.snapshot.params['gene']){
      this.fetchDataServer('search_gene')
    }else{ //Show default landing page
      this.fetchDataServer('overview')
    }
  }

  fetchDataServer(option:string){
    if(option==='search_gene'){
      //Store Gene
      this.gene = this.activatedRoute.snapshot.params['gene']
      //Ask for gene data
      this.dataService.sendMessage(this.gene,option)
    }else{
      //Clean gene
      this.gene ='';
      //Ask for default data
      this.dataService.sendMessage('',option)
    }
  }
}
