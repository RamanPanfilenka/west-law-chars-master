import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoxPlotData } from 'src/app/charts/components/box-plot/box-plot.component';
import { StackedHorizontalBarData } from 'src/app/charts/components/stacked-horizontal-bar.component.ts/stacked-horizontal-bar.component.ts.component';

@Component({
  selector: 'app-outcomes-by-type-analytics',
  templateUrl: './outcomes-by-type.component.html',
  styleUrls: ['./outcomes-by-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutcomesByTypeComponent {
  title = 'west-law';

  colorMapping: Map<string, string> = new Map<string, string>([
    ['#255688', 'Uncontested Dismissal'],
    ['#4F6DE5', 'Settled'],
    ['#63BCA8', 'Dispositive Motion'],
    ['#A4CA46', 'Verdict'],
    ['#F08633', 'Docketed Elsewhere'],
    ['#ECCA4D', 'Other'],
  ]);

  getStackedData(): StackedHorizontalBarData[] {
    const item: StackedHorizontalBarData = {
      value: 10,
      label: 'One',
      color: '#255688',
    };
    const item2: StackedHorizontalBarData = {
      value: 20,
      label: 'Two',
      color: '#4F6DE5',
    };
    const item3: StackedHorizontalBarData = {
      value: 15,
      label: 'Three',
      color: '#63BCA8',
    };
    const item4: StackedHorizontalBarData = {
      value: 2,
      label: 'Four',
      color: '#A4CA46',
    };
    const item5: StackedHorizontalBarData = {
      value: 2,
      label: 'Five',
      color: '#F08633',
    };
    const item6: StackedHorizontalBarData = {
      value: 30,
      label: 'Six',
      color: '#ECCA4D',
    };

    return [item, item2, item3, item4, item5, item6];
  }

  getStackedData2(): StackedHorizontalBarData[] {
    const item: StackedHorizontalBarData = {
      value: 8,
      label: 'One',
      color: '#255688',
    };
    const item2: StackedHorizontalBarData = {
      value: 20,
      label: 'Two',
      color: '#4F6DE5',
    };
    const item3: StackedHorizontalBarData = {
      value: 15,
      label: 'Three',
      color: '#63BCA8',
    };
    const item4: StackedHorizontalBarData = {
      value: 10,
      label: 'Four',
      color: '#A4CA46',
    };
    const item5: StackedHorizontalBarData = {
      value: 2,
      label: 'Five',
      color: '#F08633',
    };
    const item6: StackedHorizontalBarData = {
      value: 5,
      label: 'Six',
      color: '#ECCA4D',
    };

    return [item, item2, item3, item4, item5, item6];
  }

  getBoxPlotData() {
    const item: BoxPlotData = {
      label: '1',
      values: [34, 30, 34, 50, 55, 54, 40, 64, 38, 42, 44, 46, 48, 130],
    };

    const item2: BoxPlotData = {
      label: '2',
      values: [60, 75, 85, 100, 105, 110, 75, 135, 70, 80, 85, 90, 95, 65],
    };

    const item3: BoxPlotData = {
      label: '3',
      values: [34, 30, 34, 50, 55, 54, 40, 64, 38, 42, 44, 46, 48, 130],
    };

    const item4: BoxPlotData = {
      label: '4',
      values: [60, 75, 85, 100, 105, 110, 75, 135, 70, 80, 85, 90, 95, 65],
    };

    const item5: BoxPlotData = {
      label: '5',
      values: [34, 30, 34, 50, 55, 54, 40, 64, 38, 42, 44, 46, 48, 130],
    };

    return [item, item2, item3, item4, item5];
  }
}
