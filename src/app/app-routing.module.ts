import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './sections/pages/home/home.component';
import {GeneComponent} from './sections/pages/gene/gene.component'

const routes: Routes = [
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path: 'gene/:gene',
    component:GeneComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
