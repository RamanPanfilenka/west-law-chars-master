import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HorizontalBarData } from 'src/app/charts/components/horizontal-bar/horizontal-bar.component';
import * as d3 from 'd3';

@Component({
  selector: 'app-dockets-litigation',
  templateUrl: './dockets-litigation.component.html',
  styleUrls: ['./dockets-litigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocketsLitigationComponent {
  title = 'west-law';

  private showMore = false;

  getHorizontalData(): HorizontalBarData[] {
    let data = [
      { label: 'A. Darrel Terrel', value: 10 },
      { label: 'Stephanie R. James', value: 20 },
      { label: 'Patricia Marcia Allex', value: 30 },
      { label: 'Susan M. Charles', value: 40 },
      { label: 'Dan R. Sharkington', value: 35 },
      { label: 'Read D. Readcklie', value: 5 },
    ];

    data = data.sort((a, b) => b.value - a.value);

    if (!this.showMore) {
      data = data.slice(0, 5);
    }

    return data;
  }

  getMaxValue(): number {
    return d3.max(this.getHorizontalData().map((x) => x.value)) ?? 0;
  }

  onShowButtonClick() {
    this.showMore = !this.showMore;
  }

  getButtoText() {
    return this.showMore ? 'Hide' : 'Show more';
  }
}
