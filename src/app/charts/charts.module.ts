import { NgModule } from '@angular/core';
import { BoxPlotComponent } from './components/box-plot/box-plot.component';
import { HorizontalBarComponent } from './components/horizontal-bar/horizontal-bar.component';
import { MapUsComponent } from './components/map-us/map-us.component';
import { StackedHorizontalBarComponent } from './components/stacked-horizontal-bar.component.ts/stacked-horizontal-bar.component.ts.component';

@NgModule({
  declarations: [
    StackedHorizontalBarComponent,
    BoxPlotComponent,
    MapUsComponent,
    HorizontalBarComponent
  ],
  imports: [
  ],
  exports: [
    StackedHorizontalBarComponent,
    BoxPlotComponent,
    MapUsComponent,
    HorizontalBarComponent
  ],
  providers: [],
  bootstrap: []
})
export class ChartsModule { }
