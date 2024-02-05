import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import * as d3 from 'd3';
import * as d3Selection from 'd3-selection';

export interface StackedHorizontalBarData {
  value: number;
  label: string;
  color: string;
}

export interface StackedHorizontalBarGroupedData {
  value: number;
  cumulative: number;
  label: string;
  percent: number;
  color: string;
}

@Component({
  selector: 'app-stacked-horizontal-bar',
  templateUrl: './stacked-horizontal-bar.component.ts.component.html',
  styleUrls: ['./stacked-horizontal-bar.component.ts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackedHorizontalBarComponent implements AfterViewInit {
  @Input()
  id: string = '';

  @Input()
  label: string = '';

  @Input()
  data: StackedHorizontalBarData[] = [];

  private minWidth: number = 100;
  private width: number = 100;
  private height: number = 50;
  private svg: d3Selection.Selection<
    SVGSVGElement,
    unknown,
    null,
    undefined
  > | null = null;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.drawChart();
  }

  onResize(event: any): void {
    this.drawChart();
  }

  private drawChart() {
    this.createSvg();
    this.plotChart();
  }

  private createSvg(): void {
    const figure = d3.select(this.elementRef.nativeElement).select('figure');
    figure.selectChildren().remove();
    const newWidth = parseInt(figure.style('width'), 10);
    this.width = newWidth < this.minWidth ? this.minWidth : newWidth;

    this.svg = figure.append('svg').attr('height', this.height - 10);

    this.svg.attr('width', this.width);
  }

  private plotChart(): void {
    const colors = [
      '#255688',
      '#4F6DE5',
      '#63BCA8',
      '#A4CA46',
      '#F08633',
      '#ECCA4D',
    ];
    const barHeight = 16;
    const total = d3.sum(this.data, (d) => d.value);
    const groupedData = this.getGroupedData(this.data, total);
    const xScale = d3.scaleLinear().domain([0, total]).range([0, this.width]);

    const join = this.svg
      ?.selectAll('g')
      ?.data(groupedData)
      .join('g')
      .attr('transform', 'translate(0,0)');

    this.svg
      ?.append('text')
      .text(this.label)
      .attr('x', '0')
      .attr('font-size', '14px')
      .attr('y', this.height / 2 - barHeight / 2 - 4)
      .style(
        'font-family',
        "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"
      );

    const rect = join
      ?.append('rect')
      .attr('class', 'rect-stacked')
      .attr('x', (d) => 0)
      .attr('y', this.height / 2 - barHeight / 2)
      .attr('height', barHeight)
      .attr('width', (d) => xScale(d.value))
      .style('fill', (d) => d.color);

    rect
      ?.transition(d3.transition().duration(1000))
      .attr('x', function (d) {
        return xScale(d.cumulative);
      })
      .attr('width', function (d) {
        return xScale(d.value);
      });
    rect?.append('title').text(function (d) {
      return `${d.label}: ${d.value}`;
    });
  }

  private getGroupedData(
    data: StackedHorizontalBarData[],
    total: number
  ): StackedHorizontalBarGroupedData[] {
    const percent = d3.scaleLinear().domain([0, total]).range([0, 100]);
    let cumulative = 0;
    const rasult = data
      .map((d) => {
        cumulative += d.value;
        return {
          value: d.value,
          cumulative: cumulative - d.value,
          label: d.label,
          percent: percent(d.value),
          color: d.color,
        };
      })
      .filter((d) => d.value > 0);
    return rasult;
  }
}
