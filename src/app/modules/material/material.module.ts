import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


const exportableModules = [
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonToggleModule
];


@NgModule({
  declarations: [],
  imports: [...exportableModules],
  exports: [...exportableModules]
})
export class MaterialModule { }
