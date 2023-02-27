// @ts-ignore
import { getEndTime } from "./TimeMethods.ts"
import { StateParser } from "./StateParser";

export default class ChartBuilder {
    constructor(data: StateParser, id: string) {
        this.data = data;
        this.id = id;
    }

    private data: StateParser;
    private id: string;

    public getSerie() {
        return this.data.serie;
    }

    private generateOptions(): object {
        console.log((this.data['serie'][0]['data'][0]['y'][1]).toFixed(0).length-8)
        const option: object = {
            chart: {
                type: 'rangeBar',
                id: this.id,
                fontFamily: 'Arial',
                dropShadow: {
                    enabled: false,
                    color: '#000',
                    top: 3,
                    left: 1,
                    blur: 2,
                    opacity: 0.2
                  },    
                toolbar: {
                    show: true,
                    tools: {
                        download: true,
                    },
                },
                zoom: {
                    enabled: true,
                    type: 'x',  
                    autoScaleYaxis: false,  
                    zoomedArea: {
                      fill: {
                        color: '#000',
                        opacity: 0.1
                      },
                      stroke: {
                        color: '#000',
                        opacity: 0.2,
                        width: 2
                      }
                    }
                },
                events: {
                    dataPointSelection: function(event, chartContext, config) {
                        //console.log(config)
                    }
                },
                sparkline: {
                    enabled: false
                }
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
                    distributed: true,
                    barHeight: '50%',
                    borderRadius: 1,
                    rangeBarGroupRows: true,
                    dataLabels: {
                        position: 'top',
                        hideOverflowingLabels: false
                    }
                },
            },
            xaxis: {
                
                type: 'numeric',
                tickAmount: 2,
                min: 0,
                max: 1.2*getEndTime(this.data.serie[1]['data']), 
                Range: getEndTime(this.data.serie[1]['data']),
                labels: {
                    show: true,
                    formatter: function(value) {
                        return (parseInt(value)/1000000).toFixed(1)  + ' s';
                    }
                },
            },
            yaxis: {
                floating: false,
                type: 'categories',
                labels: {
                    show: true,
                    align: 'left',
                    minWidth: 0,
                    maxWidth: 120,
                    style: {
                        fonstSize: '14px'
                    }
                },
                
            },
            dataLabels: {
                enabled: true,
                offsetX: 60 + 3.9*((this.data['serie'][0]['data'][0]['y'][1]).toFixed(0).length-8),
                style: {
                    fontWeight: 'ligth',
                    fontSize: '13px',
                    fontFamily: 'Arial',
                    colors: ['#000']
                },
                formatter: function(value, opts) {
                    return ((parseInt(value[1]) - parseInt(value[0]))/1000000).toFixed(1)  + 's';
                },
                background: {
                    enabled: false,
                    foreColor: '#475569',
                    padding: 10,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: '#475569',
                    opacity: 0.7,
                    dropShadow: {
                      enabled: false,
                      top: 3,
                      left: 0,
                      blur: 2,
                      color: '#000',
                      opacity: 0.2
                    }
                  },
            },
            colors: [
                '#64748b', '#16a34a', '#fcd34d', '#dc2626'
            ],
            legend: {
                show: false,
                position: "top"
            },
            tooltip: {
                enabled: false,
                y: {
                    formatter: function(val) {
                        return (parseFloat(val)/1000000).toFixed(3) + 's';
                    },
                    title: 'Y'
                },
                onDatasetHover: {
                    highlightDataSeries: false,
                },
                style: {
                    fontSize: '22px',
                    fontFamily: 'Arial'
                },
                marker: {
                    show: false
                },
                fixed: {
                    enabled: false,
                    position: 'topRight',
                    offsetX: 50,
                    offsetY: 50,
                },
            },
            noData: {
                text: 'Loading data...',
                align: 'center',
                verticalAlign: 'middle',
                offsetX: 0,
                offsetY: 0,
                
            },
            
        };

        return option;
    }

    public getOptions (): object {
        return this.generateOptions();
    }
}