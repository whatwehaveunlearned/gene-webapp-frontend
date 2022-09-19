import { NgModule } from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';

//DONT FORGET TO ADD THE MODULES FROM HERE TO THE CUSTOM STYLES


const exportableModules = [
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonToggleModule,
  MatCardModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatDividerModule
];


@NgModule({
  declarations: [],
  imports: [...exportableModules],
  exports: [...exportableModules]
})
export class MaterialModule { }
