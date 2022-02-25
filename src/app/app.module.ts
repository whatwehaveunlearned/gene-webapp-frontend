import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material/material.module'
import { AppComponent } from './app.component';
import { HomeComponent } from './sections/components/home/home.component';
import { SearchGeneComponent } from './sections/components/search-gene/search-gene.component';
import { BarChartComponent } from './sections/components/bar-chart/bar-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './sections/components/table/table.component';
import { DataCardComponent } from './sections/components/data-card/data-card.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchGeneComponent,
    BarChartComponent,
    TableComponent,
    DataCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
