import Chart from "react-apexcharts"

const generateData = () => {
    const data = [];
    let failed = false;
  
    for (let i = 0; i < 10; i++) {  
      failed = Math.random() > 0.8 || failed;  
      const start = i > 0 ? data[i-1].y[1] : 0; 
      const point = {
        x: 'Task ' + i,
        y: [start, Math.random() > 0.5 ? start+10*(Math.random()+1) : 0.5+start+Math.random()],
        fillColor: failed ? '#FF0000' : '#20AF2E'
      }
      data.push(point)
    }
    
    return data;  
  }

const parseData = () => {
  return null;
}

const Timeline = () => {
    const state = {      
        series: [
          {
            data: generateData()
          }
        ],
        options: {
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
          chart: {
            type: 'rangeBar'
          },
          plotOptions: {
            bar: {
              horizontal: true,
              dataLabels: {
                hideOverflowingLabels: false
              }
            },
          },
          xaxis: {
            type: 'numeric'
          }
        },
      };

    return ( 
        <Chart 
            options={state.options}
            series={state.series}
            type="rangeBar"
            height="400"
          />
     );
}
 
export default Timeline;
