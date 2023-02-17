import { StateParser } from "./StateParser";

export class TimelineChart {
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
        const option: object = {
            chart: {
                type: 'rangeBar',
                id: this.id,
                fontFamily: 'monospace',
                selection: {
                    enabled : false
                },
                dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 3,
                    left: 1,
                    blur: 2,
                    opacity: 0.2
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
                    distributed: true,
                    barHeight: '70%',
                    borderRadius: 2,
                    rangeBarGroupRows: true,
                    dataLabels: {
                        position: 'middle',
                        hideOverflowingLabels: false
                    }
                },
            },
            xaxis: {
                type: 'numeric',
                tickPlacement: 'on',
                labels: {
                    formatter: function(value, opts) {
                        return (parseInt(value)/1000000).toFixed(1)  + ' s';
                    }
                }
            },
            dataLabels: {
                enabled: true,
                offsetX: 0,
                style: {
                    fontWeight: 'bold',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    colors: ['#000']
                },
                formatter: function(value, opts) {
                    return ((parseInt(value[1]) - parseInt(value[0]))/1000000).toFixed(3)  + 's';
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
                      enabled: true,
                      top: 3,
                      left: 0,
                      blur: 2,
                      color: '#000',
                      opacity: 0.2
                    }
                  },
            },
            colors: [
                '#64748b', '#16a34a'
            ],
            legend: {
                position: "top"
            },
            tooltip: {
                x: {
                    show: true,
                },
                y: {
                    formatter: function(val) {
                        return (parseFloat(val)/1000000).toFixed(3) + 's';
                    },
                    title: 'Y'
                },
                onDatasetHover: {
                    highlightDataSeries: true,
                },
                style: {
                    fontSize: '12px',
                    fontFamily: 'monospace'
                },
            }
        };

        return option;
    }

    public getOptions (): object {
        return this.generateOptions();
    }
}