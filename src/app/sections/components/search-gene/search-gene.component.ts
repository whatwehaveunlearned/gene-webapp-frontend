import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-search-gene',
  templateUrl: './search-gene.component.html',
  styleUrls: ['./search-gene.component.scss']
})
export class SearchGeneComponent implements OnInit {

  private URL:string=''
  gene:string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  keyDownSearchForm(event:KeyboardEvent){
    if(event.key === 'Enter'){
      this.URL = "/gene/" + this.gene;
      this.router.navigate([this.URL]);
    }
  }

}
