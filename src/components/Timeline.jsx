import ReactApexChart from "react-apexcharts"
import { StateParser } from "./utils/StateParser.ts";
import { TimelineChart } from "./utils/TimelineChart.ts";
import { BrushChart } from "./utils/BrushChart.ts";

const indigo = '#16a34a';
const red = '#dc2626';
const slate = '#cbd5e1';
const dark = '#0f172a';


const opt1 = {
  chart: {
    type: 'rangeBar',
    id: 'chart2',
    toolbar: {
      show: true
    },
    
  },
  grid: {
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
          show: true
      }
    }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 1,
      barHeight: '70%',
      rangeBarGroupRows: true,
      dataLabels: {
        position: 'center'
      }
    },
  },
  xaxis: {
    type: 'numeric',
  },
  dataLabels: {
    enabled: true,
    style: {
      fontWeight: 'light',
      colors: [dark]
    },
    formatter: function(value, { seriesIndex, dataPointIndex, w }) {
      return parseFloat(parseInt(w.config.series[seriesIndex].data[dataPointIndex].y[1]) - parseInt(w.config.series[seriesIndex].data[dataPointIndex].y[0]))/1000000 + ' s';
    },
    background: {
      enabled: true,
      foreColor: '#fff',
      padding: 2,
      borderRadius: 2,
      borderWidth: 1,
      borderColor: slate,
      opacity: 0.1,
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45
      }
    }
  },
  colors: [
    '#64748b', indigo
  ]
};

const opt2 = {
  chart: {
    type: 'rangeBar',
    id: 'chart1',
    toolbar: {
      autoSelected: 'selection',
      show: false
    },
    brush:{
      target: 'chart2',
      enabled: false
    },
    selection: {
      enabled: true,
      xaxis: {
        min: 70000,
        max: 1100000
      },
      fill: {
        color: '#ccc',
        opacity: 0.2
      },
      stroke: {
        color: '#0D47A1',
      }
    },
  },
  
  grid: {
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
          show: true
      }
    }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '50%',
      rangeBarGroupRows: true,
      dataLabels: {
        position: 'center'
      }
    },
  },
  xaxis: {
    labels: {
      show: false
    }
  },
  yaxis: {
    labels: {
      show: false
    }
  },
  legend: {
    show: false
  },
  colors: [
    slate, indigo
  ]
};

const Timeline = () => {
    const data = new StateParser('compute-distances.1.1.json');

    const mainChart = new TimelineChart(data, 'chart-1');
    const brushChart = new BrushChart(data, mainChart.id, 'chart-2');

    const mainLine = {            
        series: data.serie,
        options: opt1
      }

    const brushLine = {
      series: data.serie,
      options: opt2
    }

    return ( 
      <>
        <div>
          <ReactApexChart 
            options={mainLine.options} 
            series={mainLine.series} 
            type="rangeBar" 
            height="300"/>
        </div>
        <div>
          <ReactApexChart 
            options={brushLine.options} 
            series={brushLine.series} 
            type="rangeBar" 
            height="100"/>
        </div>
      </>
      );
  }
 
export default Timeline;
