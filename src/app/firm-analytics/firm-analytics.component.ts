import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HorizontalBarData } from '../charts/components/horizontal-bar/horizontal-bar.component';
import { MapUsData } from '../charts/components/map-us/map-us.component';

@Component({
  selector: 'app-firm-analytics',
  templateUrl: './firm-analytics.component.html',
  styleUrls: ['./firm-analytics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirmAnalyticsComponent {
  title = 'west-law';

  getMapData(): MapUsData[] {
    const data = [
      { name: 'Alaska', value: 10 },
      { name: 'Minnesota', value: 15 },
      { name: 'Mississippi', value: 5 },
      { name: 'Oregon', value: 1005 },
    ];

    return data;
  }
}
