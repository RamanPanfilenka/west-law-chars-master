import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartsModule } from '../charts/charts.module';
import { CaseTypeComponent } from './components/case-type/case-type.component';
import { DocketsLitigationComponent } from './components/dockets-litigation/dockets-litigation.component';
import { OutcomesByTypeComponent } from './components/outcomes-by-type.component';
import { FirmAnalyticsRoutingModule } from './firm-analytics-routing.module';
import { FirmAnalyticsComponent } from './firm-analytics.component';

@NgModule({
  declarations: [
    FirmAnalyticsComponent,
    OutcomesByTypeComponent,
    DocketsLitigationComponent,
    CaseTypeComponent
  ],
  imports: [
    FirmAnalyticsRoutingModule,
    ChartsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: []
})
export class FirmAnalyticsModule { }
