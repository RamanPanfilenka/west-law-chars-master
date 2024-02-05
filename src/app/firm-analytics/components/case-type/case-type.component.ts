import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HorizontalBarData } from 'src/app/charts/components/horizontal-bar/horizontal-bar.component';
import * as d3 from 'd3';

@Component({
  selector: 'app-case-type',
  templateUrl: './case-type.component.html',
  styleUrls: ['./case-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseTypeComponent {
  title = 'west-law';

  @Input()
  label: string = '';

  private showMore = false;

  getHorizontalData(): HorizontalBarData[] {
    let data = [
      { label: 'Intellectual Property & Technology', value: 7689 },
      { label: 'Civil', value: 2488 },
      { label: 'Contracts', value: 1467 },
      { label: 'Practice & Procedure', value: 1024 },
      { label: 'Remedies & Enforcement', value: 461 },
      { label: 'Read D. Readcklie', value: 250 },
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
