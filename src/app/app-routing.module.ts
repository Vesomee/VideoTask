import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './modules/video/components/details/details.component';
import { ListComponent } from './modules/video/components/list/list.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'video/:id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
