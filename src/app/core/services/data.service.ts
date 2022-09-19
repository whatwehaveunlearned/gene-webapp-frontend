import { Injectable } from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs'

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

  constructor() {
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

  public sendMessage(msg:string,type:string,option:string){
    let message = {
      'msg':msg,
      'type':type,
      'option':option
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
      default:
        console.log('Not a valid option')
    }


    this.data.next(JSON.parse(event.data));
  }


  fetchDataServer(component_type:string,gene?:any,option?:any){
      this.sendMessage(gene,component_type,option);
  }

}
   