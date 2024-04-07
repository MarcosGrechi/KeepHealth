import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DietDetailComponent } from '../../features/diet/diet-detail/diet-detail.component';
import { DietComponent } from './diet.component';


const dietRoutes: Routes = [
  { path: "", component: DietComponent },
  { path: ":id", component: DietDetailComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(dietRoutes)],
})

export class DietModule {}