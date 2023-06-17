import { Component, Input, OnInit } from '@angular/core';

import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.scss']
})
export class ListComponentComponent implements OnInit {

  @Input() title:any=[];
  @Input() filter:any=[];
  @Input() page:any=[];

  private data:any;
  public all_time:Object;
  public past_10:Object;
  public past_5:Object;
  public past_1:Object;
  public columns:Array<string>;
  public isLoading:boolean = true

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    //Subscribe to socket state
    this.dataService.dataServiceState.subscribe((state) =>{
      //Loading reset
      this.isLoading = true;
      if(state="opened"){
        // Fetch gene_counts data
        this.dataService.fetchDataServer('list_component',this.filter,[this.page])
      }
    })


    //Subscribe to socket data
    this.dataService.subsection_component_data.subscribe((data_recieved:any) =>{
      let dataType = data_recieved['type'];
      this.data = JSON.parse(data_recieved['data']);
      //We add the data to the proper variable depending on dataType
      switch (dataType) {
        //Histogram for all gene2pubmed data 
        case 'all_time':
          this.all_time = this.data;
          break;
        case 'past_10':
          this.past_10 = this.data;
          this.columns = ['ID', 'counts'];
          break;
          case 'past_5':
            this.past_5 = this.data;
            break;
          case 'past_1':
            this.past_1 = this.data;
            break;
        default:
          console.log('Not a valid option')
      }
      this.isLoading = false;
    })
  }

}
