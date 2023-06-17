import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import {Router} from '@angular/router'
import { DataService } from 'src/app/core/services/data.service';


@Component({
  selector: 'app-search-gene',
  templateUrl: './search-gene.component.html',
  styleUrls: ['./search-gene.component.scss']
})
export class SearchGeneComponent implements OnInit {

  private URL:string=''
  searchTerm:string="";
  allGenes: string[] = []
  // filterName:string;
  // names = ["daniel","jhon","gorka","kepa"];
  filterName:string="";
  namesFiltered = [];

  constructor(private router: Router, private dataService:DataService) { }

  ngOnInit(): void {
    //Subscribe to socket state
    this.dataService.dataServiceState.subscribe((state) =>{
      if(state="opened"){
        // this.dataService.fetchDataServer('search-component','',[])
      }
    })

    // Subscribe to socket data
    // this.dataService.search_gene_component_data.subscribe((data_recieved:any) =>{
    //   let dataType = data_recieved['type'];
    //   // const chunkSize = 1000000;
    //   // for (let i = 0; i < data_recieved['data'].length; i += chunkSize) {
    //   //   const chunk = data_recieved['data'].slice(i, i + chunkSize);
    //   //   this.allGenes = [...this.allGenes,...chunk] //Add the chunk
    //   //   setTimeout(() => {
    //   //   }, 0);
    //   // }
    //   this.allGenes = data_recieved['data']
    //   // //We add the data to the proper variable depending on dataType
    //   // switch (dataType) {
    //   //   //Information for gene_info card 
    //   //   case 'gene_info':
    //   //     this.gene_info = this.data;
    //   //     this.geneSymbol = this.gene_info['Official_Symbol'];
    //   //     break;
    //   //   default:
    //   //     console.log('Error: Not a valid option') 
    //   // }
    // })
  }

  keyDownSearchForm(event:KeyboardEvent){
    if(event.key === 'Enter'){
      //If number it is a geneId
      if(!isNaN(parseInt(this.searchTerm))){
        this.URL = "/gene/" + this.searchTerm;
        window.open(this.URL, '_blank');
        // this.router.navigate([this.URL]);
      }else{
        this.URL = "/search_results/" + this.searchTerm;
        window.open(this.URL, '_blank');
        // this.router.navigate([this.URL]);
      }
    }
  }

  search(e:any,item:any){
    console.log(item)
    this.dataService.id_from_name('search-component',item)
  }
  

}

@Pipe({name: 'filterByName'})
export class SearchFilter implements PipeTransform {
  transform(listOfNames: string[], nameToFilter: string): string[] {
    if(!listOfNames) return [''];
    if(!nameToFilter) return listOfNames;

    return listOfNames.filter(n => n.indexOf(nameToFilter) >= 0);
  }
}
