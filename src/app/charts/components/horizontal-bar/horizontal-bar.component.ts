import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import * as d3 from 'd3';
import * as d3Selection from 'd3-selection';

export interface HorizontalBarData {
  value: number;
  label: string;
}

export interface StackedHorizontalBarGroupedData {
  value: number;
  cumulative: number;
  label: string;
  percent: number;
  color: string;
}

@Component({
  selector: 'app-horizontal-bar',
  templateUrl: './horizontal-bar.component.html',
  styleUrls: ['./horizontal-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalBarComponent implements AfterViewInit {
  @Input()
  id: string = '';

  @Input()
  label: string = '';

  @Input()
  maxValue: number = 0;
  @Input()
  barHeight: number = 15;
  @Input()
  height: number = 25;

  @Input()
  data: HorizontalBarData[] = [];

  private minWidth: number = 100;
  private width: number = 100;
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

    this.svg = figure.append('svg').attr('height', this.height);

    this.svg.attr('width', this.width);
  }

  private plotChart(): void {
    const x = d3
      .scaleLinear()
      .domain([0, this.maxValue])
      .range([0, this.width]);

    const y = d3
      .scaleBand()
      .domain(this.data.map((x) => x.label))
      .rangeRound([0, this.height])
      .padding(0.5);

    const join = this.svg
      ?.selectAll('g')
      ?.data(this.data)
      .join('g')
      .attr('transform', 'translate(0,0)');

    join
      ?.append('rect')
      .attr('fill', '#F0F0F0')
      .attr('x', x(0) ?? 0)
      .attr('y', (d) => (this.data.length == 1 ? 0 : y(d.label) ?? 0))
      .attr('width', (d) => x(this.maxValue) - x(0))
      .attr('height', this.barHeight);
    const rect = join
      ?.append('rect')
      .attr('fill', '#63BCA8')
      .attr('stroke', '#397166')
      .attr('x', x(0) ?? 0)
      .attr('y', (d) => (this.data.length == 1 ? 0 : y(d.label) ?? 0))
      .attr('width', (d) => 0)
      .attr('height', this.barHeight);

    rect
      ?.transition(d3.transition().duration(1000))
      .attr('x', x(0) ?? 0)
      .attr('width', (d) => x(d.value) - x(0));
  }
}
