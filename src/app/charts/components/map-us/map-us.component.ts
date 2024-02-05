import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import * as d3 from 'd3';
import * as d3Selection from 'd3-selection';
import * as topojson from 'topojson';

export interface MapUsData {
  name: string;
  value: number;
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
  selector: 'app-map-us',
  templateUrl: './map-us.component.html',
  styleUrls: ['./map-us.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapUsComponent implements AfterViewInit {
  @Input()
  id: string = '';

  @Input()
  label: string = '';

  @Input()
  data: MapUsData[] = [];

  private minWidth: number = 100;
  private width: number = 100;
  private height: number = 225;
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

  private drawChart() {
    this.createSvg();
    this.plotChart();
  }

  private createSvg(): void {
    const figure = d3.select(this.elementRef.nativeElement).select('figure');
    figure.selectChildren().remove();
    const newWidth = parseInt(figure.style('width'), 10);
    this.width = newWidth < this.minWidth ? this.minWidth : newWidth;

    this.svg = figure
      .append('svg')
      .attr('width', this.width - 250)
      .attr('height', this.height - 20)
      .attr('viewBox', [0, 0, 975, 610])
      .attr('style', 'max-width: 100%; height: auto;');
  }

  private async plotChart(): Promise<void> {
    const color = d3.scaleQuantize([1, 10], d3.schemeBlues[9]);
    const path = d3.geoPath();
    const format = (d: any) => `${d}%`;
    const response = await fetch(
      'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json'
    );
    const us = await response.json();
    // The counties feature collection is all U.S. counties, each with a
    // five-digit FIPS identifier. The statemap lets us lookup the name of
    // the state that contains a given county; a state’s two-digit identifier
    // corresponds to the first two digits of its counties’ identifiers.
    const namemap = new Map(
      us.objects.states.geometries.map((d: any) => [d.properties.name, d.id])
    );
    const counties = topojson.feature(us, us.objects.counties);
    const states = topojson.feature(us, us.objects.states);
    const statemap = new Map(
      (states as any).features.map((d: any) => [d.id, d])
    );

    const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);

    const valuemap = new Map(
      this.data.map((d) => [namemap.get(d.name), d.value])
    );

    const features = (topojson.feature(us, us.objects.states) as any).features;

    this.svg
      ?.append('g')
      .selectAll('path')
      .data(features)
      .join('path')
      .attr('fill', (d: any) => this.getColor(valuemap.get(d.id)))
      .attr('d', path as any)
      .append('title')
      .text((d: any) => `${d.properties.name}\n${valuemap.get(d.id) ?? 0}`);

    this.svg
      ?.append('path')
      .datum(states)
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-linejoin', 'round')
      .attr('d', path);
  }

  private getColor(value: number | undefined) {
    if (!value) return '#D9D9D9';

    return value > 1000 ? '#255688' : '#92BDE7';
  }
}
