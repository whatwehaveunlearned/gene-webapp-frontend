import { Component, OnInit, Input, OnChanges,SimpleChanges } from '@angular/core';

import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @Input() value:any=[];
  @Input() page:any=[];

  //data for component
  private data:any;
  public data_summary_hist_all_gene2pubmed:Object;
  public data_summary_hist_cum_all_gene2pubmed:Object;
  public data_summary_hist_research_gene2pubmed:Object;
  public data_summary_hist_cum_research_gene2pubmed:Object;
  public data_summary_hist_reviews_gene2pubmed:Object;
  public data_summary_hist_cum_reviews_gene2pubmed:Object;
  public n_papers_all_gene2pubmed:string;
  public n_papers_research_gene2pubmed:string;
  public n_papers_reviews_gene2pubmed:string;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    //Subscribe to socket state
    this.dataService.dataServiceState.subscribe((state) =>{
      if(state="opened"){
        //Fetch summary component data
        this.dataService.fetchDataServer('summary_component',this.value,[this.page])
      }
    })


    //Subscribe to socket data
    this.dataService.summary_component_data.subscribe((data_recieved:any) =>{
      let dataType = data_recieved['type'];
      this.data = JSON.parse(data_recieved['data']);
      //We add the data to the proper variable depending on dataType
      switch (dataType) {
        //Histogram for all gene2pubmed data 
        case 'histogram_summary_all_gene2pubmed':
          this.data_summary_hist_all_gene2pubmed = this.data;
          break;
        //Histogram for research papers in gene2pubmed data 
        case 'histogram_summary_research_gene2pubmed':
          this.data_summary_hist_research_gene2pubmed = this.data;
          break;
        //Histogram for reviews and others in gene2pubmed data 
        case 'histogram_summary_reviews_gene2pubmed':
          this.data_summary_hist_reviews_gene2pubmed = this.data;
          break;
        //Cumulative Histogram for all gene2pubmed data 
        case 'histogram_cum_summary_all_gene2pubmed':
          this.data_summary_hist_cum_all_gene2pubmed = this.data;
          break;
        //Cumulative Histogram for research gene2pubmed data 
        case 'histogram_cum_summary_research_gene2pubmed':
          this.data_summary_hist_cum_research_gene2pubmed = this.data;
          break;
        //Cumulative Histogram for reviews gene2pubmed data 
        case 'histogram_cum_summary_reviews_gene2pubmed':
          this.data_summary_hist_cum_reviews_gene2pubmed = this.data;
          break;
        //Total number of papers in all gene2_pubmed 
        case 'n_papers_summary_all_gene2pubmed':
          this.n_papers_all_gene2pubmed= this.data;
          break;
        //Total number of research papers in gene2_pubmed 
        case 'n_papers_summary_research_gene2pubmed':
          this.n_papers_research_gene2pubmed= this.data;
          break;
        //Total number ofreview  papers in gene2_pubmed 
        case 'n_papers_summary_reviews_gene2pubmed':
          this.n_papers_reviews_gene2pubmed= this.data;
          break;
        default:
          console.log('Not a valid option')
      }
    })
  }

}
