import { Component, OnInit, Input } from '@angular/core';

import { DataService } from 'src/app/core/services/data.service';


@Component({
  selector: 'app-subsection',
  templateUrl: './subsection.component.html',
  styleUrls: ['./subsection.component.scss']
})
export class SubsectionComponent implements OnInit {

  @Input() subsectionType:string='';
  @Input() filter:any=[];
  @Input() page:any =[];
  
  private data:any;
  public gene_counts_all_time:Object;
  public gene_counts_past_10:Object;
  public gene_counts_past_5:Object;
  public gene_counts_past_1:Object;
  public author_counts_all_time:Object;
  public author_counts_past_10:Object;
  public author_counts_past_5:Object;
  public author_counts_past_1:Object;
  public columns:Array<string>;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    //Subscribe to socket state
    this.dataService.dataServiceState.subscribe((state) =>{
      if(state="opened"){
        if(this.subsectionType=='gene'){
        // Fetch gene_counts data
        this.dataService.fetchDataServer('subsection_component',this.filter,['gene',this.page])
        }else if(this.subsectionType=='author'){
          // Fetch author_counts data
        this.dataService.fetchDataServer('subsection_component',this.filter,['author',this.page])
        }
      }
    })


    //Subscribe to socket data
    this.dataService.subsection_component_data.subscribe((data_recieved:any) =>{
      let dataType = data_recieved['type'];
      this.data = JSON.parse(data_recieved['data']);
      //We add the data to the proper variable depending on dataType
      switch (dataType) {
        //Histogram for all gene2pubmed data 
        case 'gene_counts_all_time':
          this.gene_counts_all_time = this.data;
          break;
        case 'gene_counts_past_10':
          this.gene_counts_past_10 = this.data;
          // this.columns = ['ID', 'counts'];
          break;
        case 'gene_counts_past_5':
            this.gene_counts_past_5 = this.data;
            break;
        case 'gene_counts_past_1':
            this.gene_counts_past_1 = this.data;
            break;
        case 'author_counts_all_time':
            this.author_counts_all_time = this.data;
            break;
        case 'author_counts_past_10':
          this.author_counts_past_10 = this.data;
          break;
        case 'author_counts_past_5':
          this.author_counts_past_5 = this.data;
          break;
        case 'author_counts_past_1':
          this.author_counts_past_1 = this.data;
          break;
        default:
          console.log('Not a valid option')
      }
    })
  }

}
