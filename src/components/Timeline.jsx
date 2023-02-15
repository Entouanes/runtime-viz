import ReactApexChart from "react-apexcharts"

const indigo = '#16a34a';
const red = '#dc2626';
const slate = '#cbd5e1';
const dark = '#0f172a';

const generateData = () => {
  const data = [];
  let failed = false;
  
  for (let i = 0; i < 10; i++) {  
    failed = Math.random() > 0.8 || failed;  
    const start = i > 0 ? data[i-1].y[1] : 0; 
    const point = {
      x: 'Task ' + i,
      y: [start, Math.random() > 0.5 ? start+10*(Math.random()+1) : 0.5+start+Math.random()],
      fillColor: failed ? slate : indigo
    }
    data.push(point)
  }
    
  return data;  
 }

const toMicro = (time) => {
  const minutes = parseFloat(time.split(':')[1])*60;
  const sec = parseFloat(time.split(':')[2]);
  return (minutes+sec)*1000000;
}

const durationMicro = (duration) => {
  return parseFloat((duration.split('T')[1]).split('S')[0])*1000000;
}

const getEndTime = (data) => {
  var max = -1;
  for (const action in data) {
    if (data[action]['y'][1] > max) {
      max = data[action]['y'][1];
    }
  }
  return max;
}

const parseStateFileSerie = () => {
  const stateFile = require('../assets/config/state/compute-distances.1.1.json');
  const runStartTime = toMicro(stateFile.runStartTime);
  const attempStartTime = toMicro(stateFile.attemptStartTime);
  var actions = [];

  for (const action in stateFile.actionsState) {
    const state = stateFile.actionsState[action].state;
    const start = toMicro(stateFile.actionsState[action].startTstmp);
    const duration = durationMicro(stateFile.actionsState[action].duration);

    actions.push({
          x: action,
          y: [start-runStartTime, start + duration-runStartTime],
          fillColor: (state === 'SUCCEEDED') ? indigo : red
    });
  }

  var series =  [
    {
      name: 'Run',
      data: [
        {
          x: 'Attempt ' + stateFile.attemptId + ' runtime',
          y: [attempStartTime-runStartTime, getEndTime(actions)],
          fillColor: '#94a3b8'
        }
      ]
    },
    {
      name: 'Actions',
      data: actions
    }
  ]
  
  return series;
}

const opt1 = {
  chart: {
    type: 'rangeBar',
    id: 'chart2',
    toolbar: {
      autoSelected: 'pan',
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
    const _series = parseStateFileSerie();
    const state = {      
        series: _series,
        options: opt1
      }

    const state2 = {
      series: _series,
      options: opt2
    }

    return ( 
      <>
        <div>
          <ReactApexChart 
            options={state.options} 
            series={state.series} 
            type="rangeBar" 
            height="300"/>
        </div>
        <div>
          <ReactApexChart 
            options={state2.options} 
            series={state2.series} 
            type="rangeBar" 
            height="100"/>
        </div>
      </>
      );
  }
 
export default Timeline;
