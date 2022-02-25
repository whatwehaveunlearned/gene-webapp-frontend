import { Injectable } from '@angular/core';
import {Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public socket:WebSocket;
  public dataServiceState:Subject<string> = new Subject<string>();
  private address:string = "ws://" + "0.0.0.0" + ":8000/echo";
  public data:Subject<Array<any>> = new Subject<Array<any>>();

  constructor() {
    this.socket = new WebSocket(this.address)
    this.socket.onmessage = ((event) => {
      //If we get data  
      console.log(event)
      this.recieveMessage(event);
    })
    
    this.socket.onopen = ((event) => {
      //We open socket
      console.log('Socket is opened')
      this.dataServiceState.next("open")
    })
    
  }

  public sendMessage(msg:string,type:string){
    let message = {
      'msg':msg,
      'type':type
    }
    this.socket.send(JSON.stringify(message))
  }

  private recieveMessage(event:any){
    this.data.next(JSON.parse(event.data));
  }
}
   