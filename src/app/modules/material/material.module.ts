import { NgModule } from '@angular/core';

import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatLegacyTabsModule as MatTabsModule} from '@angular/material/legacy-tabs';
import {MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from '@angular/material/legacy-progress-spinner';
import {MatDividerModule} from '@angular/material/divider';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatIconModule} from '@angular/material/icon'

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
  MatDividerModule,
  MatListModule,
  MatIconModule
];


@NgModule({
  declarations: [],
  imports: [...exportableModules],
  exports: [...exportableModules]
})
export class MaterialModule { }
