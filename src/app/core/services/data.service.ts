import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject, BehaviorSubject, Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public socket:WebSocket;
  public dataServiceState:BehaviorSubject<string> = new BehaviorSubject<string>('');
  //Local
  private serverIP = "127.0.0.1"
  //AWS
  // private serverIP ="184.72.130.201"
  
  private address:string = "ws://" + this.serverIP + ":8000/echo";
  public data:Subject<Array<any>> = new Subject<Array<any>>();

  //Each component is subscribed to its data
  public summary_component_data:Subject<Array<any>> = new Subject<Array<any>>();
  public subsection_component_data:Subject<Array<any>> = new Subject<Array<any>>();
  public gene_component_data:Subject<Array<any>> = new Subject<Array<any>>();
  public author_component_data:Subject<Array<any>> = new Subject<Array<any>>();
  // public search_gene_component_data:Subject<Array<any>> = new Subject<Array<any>>();
  public search_results_component_data:Subject<Array<any>> = new Subject<Array<any>>();


  constructor(private http: HttpClient) {
    this.socket = new WebSocket(this.address)
    this.socket.onmessage = ((event) => {
      //If we get data  
      console.log(event);
      this.recieveMessage(event);
    })
    
    this.socket.onopen = ((event) => {
      //We open socket
      console.log('Socket is opened');
      this.dataServiceState.next("open");
    })
    
  }

  public sendMessage(value:string,component_type:string,options:string){
    let message = {
      'value':value,
      'component_type':component_type,
      'options':options
    }
    this.socket.send(JSON.stringify(message))
  }

  private recieveMessage(event:any){
    let data_recieved = JSON.parse(event.data);
    let dataComponent = data_recieved['component']
    switch (dataComponent) {
      //we send the value to the proper component
      case 'summary_component':
        this.summary_component_data.next(data_recieved);
        break;
      case 'subsection_component':
        this.subsection_component_data.next(data_recieved);
        break;
      case 'gene_component':
        this.gene_component_data.next(data_recieved);
        break;
      case 'author_component':
        this.author_component_data.next(data_recieved);
        break;
      // case 'search-component':
      //   this.search_gene_component_data.next(data_recieved);
      //   break;
      case 'search-results-component':
        this.search_results_component_data.next(data_recieved);
        break;
      default:
        console.log('Not a valid option')
    }


    this.data.next(JSON.parse(event.data));
  }


  /*
    Helper Function to get data from the server
    @Params: 
      -component_type: (string) Component that sends and recieves the data.
          Variable used in the server to select what to run.
          It can also have value 'server-helper-functions' for 
          getting results from specific server functions that can be used in
          different components.
      -value:  (any) Data-filter value
      -options: (any) array-like (of Strings)
        FOR NORMAL COMPONENT DATA FETCH
        If one element: (component appears in different pages)
          options[0] => current page. (home, gene, author)
        If 2 elements: (component appears in different pages and subsections)
          option[0] => data type. Used to select data for subsection.
          option[1] => page. current page. (home, gene, author)
        FOR  SERVER-HELPER-FUNCTIONS
          option[0] => function_to_execute
   */
  fetchDataServer(component_type:string,value?:any,options?:any){
      this.sendMessage(value,component_type,options);
  }

  //I will fix this one
  id_from_name(component_type:string, name:string){
    this.sendMessage(name,component_type,'id_from_name')
  }

  //Helper functions definitions
  getPrimaryGeneFromSymbolGroup(symbolGroup: string): Observable<any> {
    const apiUrl = 'http://' +  this.serverIP  +':8000/get_primary_gene_from_symbol_group';
    const params = { symbol_group: symbolGroup };
    return this.http.get<any>(apiUrl, { params });
  }

}
   