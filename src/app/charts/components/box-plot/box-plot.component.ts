import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import * as d3 from 'd3';
import * as d3Selection from 'd3-selection';

export interface BoxPlotData {
  label: string;
  values: number[];
}

export interface BoxPlotStatisticsData {
  median: number;
  q1: number;
  q3: number;
  interQuantileRange: number;
  min: number;
  max: number;
  key: string;
}

@Component({
  selector: 'app-box-plot',
  templateUrl: './box-plot.component.html',
  styleUrls: ['./box-plot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxPlotComponent implements AfterViewInit {
  @Input()
  id: string = '';

  @Input()
  label: string = '';

  @Input()
  data: BoxPlotData[] = [];

  private minWidth: number = 100;
  private width: number = 100;
  private height: number = 225;
  private dotWidth: number = 2;
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
    const statistics = this.data.map((x) => this.getStatistics(x));
    const keys = this.data.map((x) => x.label);
    const min = d3.min<number>(statistics.map((x) => x.min)) ?? 0;
    const max = d3.max<number>(statistics.map((x) => x.max)) ?? 0;

    const xScale = d3
      .scaleLinear()
      .domain([min, max])
      .range([this.dotWidth, this.width - this.dotWidth - 30]);

    const yScale = d3
      .scalePoint()
      .domain(keys)
      .range([0, this.height])
      .padding(0.55);

    d3.axisBottom(xScale).tickSize(0).tickPadding(10);

    const g = this.svg?.append('g').attr('transform', `translate(0, 0)`);

    g?.selectAll('lines')
      ?.data(statistics)
      .join('line')
      ?.attr('x1', (x) => xScale(x.min))
      ?.attr('x2', (x) => xScale(x.max))
      // vertically centered
      ?.attr('y1', (x) => yScale(x.key) ?? 0)
      .attr('y2', (x) => yScale(x.key) ?? 0)
      .attr('stroke', '#397166')
      .attr('stroke-width', '1px');

    const barHeight = 15;
    var rects = g
      ?.selectAll('rect')
      .data(statistics)
      .enter()
      .append('rect')
      .attr('x', (x) => xScale(x.q1))
      .attr('width', (x) => xScale(x.q3) - xScale(x.q1))
      .attr('y', (x) => (yScale(x.key) ?? 0) - barHeight / 2)
      .attr('height', barHeight)
      .attr('fill', '#63BCA8')
      .attr('stroke', '#397166')
      .attr('stroke-width', '1px');

    g?.selectAll('dots')
      .data(statistics)
      .enter()
      .append('circle')
      .attr('cx', (x) => xScale(x.min))
      .attr('r', this.dotWidth)
      .attr('cy', (x) => yScale(x.key) ?? 0)
      .attr('fill', '#397166');

    g?.selectAll('dots')
      .data(statistics)
      .enter()
      .append('circle')
      .attr('cx', (x) => xScale(x.max))
      .attr('r', this.dotWidth)
      .attr('cy', (x) => yScale(x.key) ?? 0)
      .attr('fill', '#397166');

    g?.selectAll('median')
      .data(statistics)
      .enter()
      .append('text')
      .attr('x', (x) => xScale(max) + 15)
      .attr('y', (x) => (yScale(x.key) ?? 0) + 2)
      .attr('font-size', '10px')
      .text((x) => x.median);
  }

  private getStatistics(data: BoxPlotData) {
    const sortedData = data.values.sort((a, b) => a - b);
    const median = d3.median(sortedData);
    const q1 = d3.quantile(sortedData, 0.25) ?? 0;
    const q3 = d3.quantile(sortedData, 0.75) ?? 0;
    const interQuantileRange = q3 - q1;
    const minAbsolute = d3.min(sortedData) ?? 0;
    const maxAbsolute = d3.max(sortedData) ?? 0;
    const minIQR = q1 - interQuantileRange * 1.5;
    const maxIQR = q3 + interQuantileRange * 1.5;
    const min = minIQR > minAbsolute ? minIQR : minAbsolute;
    const max = maxIQR < maxAbsolute ? maxIQR : maxAbsolute;

    return {
      q1: q1,
      median: median ?? 0,
      q3: q3,
      interQuantileRange: interQuantileRange,
      min: min,
      max: max,
      key: data.label,
    };
  }
}
