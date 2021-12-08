import { Options } from 'highcharts';

export const DefaultChartSettings: Options = {
  chart: {
    type: 'spline',
    backgroundColor: 'none',
    renderTo: 'chart'
  },
  credits: {
    enabled: false,
  },
  exporting: {
    enabled: false,
  },
  title: {
    text: null
  },
  xAxis: {
    labels: {
      rotation: -90,
      style: {
        fontSize: '11px'
      }
    },
    categories: []
  },
  yAxis: {
    allowDecimals: false,
    min: 0,
    title: null,
  },
  tooltip: {
    headerFormat: '<b>Date: {point.key}</b></br>',
    pointFormat: '<span style="color: {series.color}">\u25CF</span> {series.name}: {point.y}',
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      depth: 400,
    },
    series: {
      borderWidth: 0,
      connectNulls: true,
    }
  },
  legend: {
    enabled: true,
  }
};
