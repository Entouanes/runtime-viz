import ReactApexChart from "react-apexcharts"
import { StateParser } from "./utils/StateParser.ts";
import { TimelineChart } from "./utils/TimelineChart.ts";
import { BrushChart } from "./utils/BrushChart.ts";


const Timeline = () => {
    const data = new StateParser('vmdl.9619.1.json');
    const mainChart = new TimelineChart(data, 'chart-1');
    const brushChart = new BrushChart(data, mainChart.id, 'chart-2');

    return ( 
      <>
       <div>
          <ReactApexChart 
            options={mainChart.getOptions()} 
            series={mainChart.getSerie()} 
            type="rangeBar" 
            height="500"/>
        </div>
        <div>
          <ReactApexChart 
            options={brushChart.getOptions()} 
            series={brushChart.getSerie()} 
            type="rangeBar" 
            height="150"/>
        </div>
      </>
      );
  }
 
export default Timeline;
