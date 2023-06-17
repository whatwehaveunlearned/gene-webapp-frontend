import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './sections/pages/home/home.component';
import { GeneComponent } from './sections/pages/gene/gene.component';
import { AuthorComponent } from './sections/pages/author/author.component';
import {SearchResultsComponent} from './sections/pages/search-results/search-results.component'

const routes: Routes = [
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path: 'gene/:gene',
    component:GeneComponent
  },
  {
    path: 'author/:author',
    component:AuthorComponent
  },
  {
    path:'search_results/:term',
    component:SearchResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
