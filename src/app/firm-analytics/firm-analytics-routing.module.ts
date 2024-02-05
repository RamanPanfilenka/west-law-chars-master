import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirmAnalyticsComponent } from './firm-analytics.component';

const routes: Routes = [
  {
    path: "",
    component: FirmAnalyticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirmAnalyticsRoutingModule { }
