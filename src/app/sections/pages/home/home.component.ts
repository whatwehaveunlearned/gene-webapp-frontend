import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router'

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
    private activatedRoute:ActivatedRoute,
    private router:Router
    ){}

  ngOnInit(): void {}

}
