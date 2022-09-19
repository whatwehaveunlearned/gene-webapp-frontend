import { OnInit, Component } from '@angular/core';
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
  public geneID:string = '8989';
  public geneSymbol:string=''

  //data from server
  public data:Object;

  //Data for sections
  public gene_info:any;
  public gene_counts_all_time:any;

  //active Route
  // activeRouteString:string =''

  constructor(
    private dataService:DataService,
    private activatedRoute:ActivatedRoute,
    private router:Router
    ){}

  ngOnInit(): void {
    //Store Route on landing
    this.geneID = this.activatedRoute.snapshot.params['gene']
    //Subscribe to socket state
    this.dataService.dataServiceState.subscribe((state) =>{
      if(state="opened"){
        this.dataService.fetchDataServer('get_gene_info',this.geneID)
      }
    })

    // Subscribe to socket data
    this.dataService.gene_component_data.subscribe((data_recieved:any) =>{
      let dataType = data_recieved['type'];
      this.data = JSON.parse(data_recieved['data']);
      //We add the data to the proper variable depending on dataType
      switch (dataType) {
        //Information for gene_info card 
        case 'gene_info':
          this.gene_info = this.data;
          this.geneSymbol = this.gene_info['Official_Symbol'];
          break;
        //Rank table for gene_info card
        case 'gene_counts_all_time':
          this.gene_counts_all_time = this.data;
          break;
        default:
          console.log('Error: Not a valid option') 
      }
    })
  }

}
