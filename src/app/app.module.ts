import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material/material.module'
import { AppComponent } from './app.component';
import { HomeComponent } from './sections/pages/home/home.component';
import { SearchGeneComponent, SearchFilter } from './sections/components/search-gene/search-gene.component';
import { BarChartComponent } from './sections/components/bar-chart/bar-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './sections/components/table/table.component';
import { DataCardComponent } from './sections/components/data-card/data-card.component';
import { FormsModule } from '@angular/forms';
import { GeneComponent } from './sections/pages/gene/gene.component';
import { SummaryComponent } from './sections/components/summary/summary.component';
import { SubsectionComponent } from './sections/components/subsection/subsection.component';
import { ListComponentComponent } from './sections/components/list-component/list-component.component';
import { AuthorComponent } from './sections/pages/author/author.component';
import { SearchResultsComponent } from './sections/pages/search-results/search-results.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchGeneComponent,
    SearchFilter,
    BarChartComponent,
    TableComponent,
    DataCardComponent,
    GeneComponent,
    SummaryComponent,
    SubsectionComponent,
    ListComponentComponent,
    AuthorComponent,
    SearchResultsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
