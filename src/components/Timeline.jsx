import ReactApexChart from "react-apexcharts"
import { StateParser } from "./utils/StateParser.ts";
import { TimelineChart } from "./utils/TimelineChart.ts";
import { BrushChart } from "./utils/BrushChart.ts";


const Timeline = () => {
    const run = 'vmdl.9619.1.json';
    const data = new StateParser(run);
    //const data = new StateParser('tmc_cidra.550.1.json');
    const mainChart = new TimelineChart(data, 'chart-1');
    const brushChart = new BrushChart(data, mainChart.id, 'chart-2');

    var rows = 0;
    for (let i = 0; i < mainChart.data.serie.length; i++) {
      rows += mainChart.data.serie[i].data.length;
    }
    return ( 
      <>
        <div className="m-40 bg-white rounded-lg p-10 ring-1 ring-slate-900/5 shadow-xl">
          <h2 className="text-slate-900 p-2">Project {run.split('.')[0]}: RUN_ID {run.split('.')[1]}, ATTEMPT_ID #{run.split('.')[2]} timeline</h2>
          <div className="pl-4 pr-4">
            <div>
              <ReactApexChart 
                options={mainChart.getOptions()} 
                series={mainChart.getSerie()} 
                type="rangeBar" 
                height={85 + 15*rows}/>
            </div>
            {/* <div>
              <ReactApexChart 
                options={brushChart.getOptions()} 
                series={brushChart.getSerie()} 
                type="rangeBar" 
                height="115"/>
            </div> */}
          </div>
        </div>
      </>
      );
  }
 
export default Timeline;
