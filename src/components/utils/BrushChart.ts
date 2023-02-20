// @ts-ignore
import { getEndTime } from "./TimeMethods.ts"
import { StateParser } from "./StateParser";


export class BrushChart {
    constructor(data: StateParser, target: string, id: string) {
        this.data = data;
        this.id = id;
        this.target = target;
    }

    private data: StateParser;
    private id: string;
    private target: string;

    public getSerie() {
        return this.data.serie;
    }

    private generateOptions(): object {
        const option: object = {
            chart: {
              type: 'rangeBar',
              id: this.id,
              toolbar: {
                show: false,
                autoSelected: 'selection'
              },
              brush:{
                target: this.target,
                enabled: false
              },
              selection: {
                enabled: true,
                fill: {
                  color: '#1e293b',
                  opacity: 0.01
                },
                xaxis: {
                    min: 0,
                    max: getEndTime(this.data.serie[1]['data'])
                },
                stroke: {
                  color: '#1e293b',
                  opacity: 1
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
                    show: false
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
                '#cbd5e1', '#16a34a'
            ],
            tooltip: {
              enabled: false
            }
        };

        return option;
    }

    public getOptions (): object {
        return this.generateOptions();
    }
}