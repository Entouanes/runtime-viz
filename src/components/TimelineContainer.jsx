import ReactApexChart from "react-apexcharts"
import { StateParser } from "./utils/StateParser.ts";
import ChartBuilder from "./utils/ChartBuilder.ts";
import { BrushChart } from "./utils/BrushChart.ts";
import { Component } from "react";

export default class TimelineContainer extends Component {
  constructor(props) {
    super(props);
    this.data = new StateParser(props.run);
    this.mainChart = new ChartBuilder(this.data, 'chart-1');
    this.rows = 0;
    for (let i = 0; i < this.mainChart.data.serie.length; i++) {
      this.rows += this.mainChart.data.serie[i].data.length;
    }
  }

  render() {
    return (
      <ReactApexChart 
        options={this.mainChart.getOptions()} 
        series={this.mainChart.getSerie()} 
        type="rangeBar" 
        height={(85 + 15*this.rows)}/>
    );
  }
};
