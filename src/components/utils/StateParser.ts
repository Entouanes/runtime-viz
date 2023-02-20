// @ts-ignore
import { toMicro, durationMicro, getEndTime } from "./TimeMethods.ts"

export class StateParser {
       
    constructor(fileName: string) {
        this.stateFile = require('../../assets/config/state/' + fileName);
        this.actions = this.parseActions();
        this.serie = this.generateSerie();
    }

    // Attribute     
    public stateFile : {
        attemptStartTime: string,
        attemptId: string,
        runStartTime: string,
        actionsState: {
            state: string,
            startTstmp: string,
            duration: string
        }
    };
    public actions: any;
    public serie: object[];

    // Properties
    private generateSerie() : object[] {
        var succeeded: object[] = [];
        var skipped: object[] = [];
        var cancelled: object[] = [];
        const start: number = toMicro(this.stateFile.runStartTime);
        
        for (let i = 0; i < this.actions.length; i++) {
            if (this.actions[i].state === 'SUCCEEDED') {
                succeeded.push(
                    this.generateInterval(
                        this.actions[i].name, 
                        this.actions[i].state, 
                        start, toMicro(this.actions[i].start), 
                        durationMicro(this.actions[i].duration)));
            } else if (this.actions[i].state === 'SKIPPED') {
                skipped.push(
                    this.generateInterval(
                        this.actions[i].name, 
                        this.actions[i].state, 
                        start, toMicro(this.actions[i].start), 
                        durationMicro(this.actions[i].duration)));
            } else {
                cancelled.push(
                    this.generateInterval(
                        this.actions[i].name, 
                        this.actions[i].state, 
                        start, toMicro(this.actions[i].start), 
                        durationMicro(this.actions[i].duration)));
            }
        }

        return this.addAttemptData(succeeded, skipped, cancelled, start);
    }

    private generateInterval(name: string, state: string, start: number, startAction: number,  duration: number) {
        return {
            x: name,
            y: [
                startAction - start, 
                startAction + duration - start
            ],
            fillColor: (state === 'SUCCEEDED') ? '#16a34a' : ((state === 'SKIPPED') ? '#fcd34d' : '#dc2626')
        }
    }

    private addAttemptData(succeeded: object[], skipped: object[], cancelled: object[], start: number) {
        const categorize: boolean = false;
        
        var serie: object[] = [
            {
                name: 'Run',
                data: [
                    {
                        x: 'Attempt ' + this.stateFile.attemptId + ' runtime',
                        y: [
                            toMicro(this.stateFile.attemptStartTime) - start,
                            getEndTime(succeeded.concat(skipped.concat(cancelled)))
                        ],
                        fillColor: '#94a3b8'
                    }
                ]
            }
        ];

        if (categorize) {
            serie = serie.concat(this.categorizeSeries(succeeded, skipped, cancelled));
        } else {
            console.log(serie.concat(succeeded.concat(skipped.concat(cancelled)).sort(this.cmp)))
            serie = serie.concat({
                name: 'Actions',
                data: succeeded.concat(skipped.concat(cancelled)).sort(this.cmp)
            });
        }

        return serie;
    }

    private categorizeSeries(succeeded: object[], skipped: object[], cancelled: object[]) {
        const res: object[] = [];
        if (succeeded.length > 0) {
            res.push(
                {
                    name: 'Succeded',
                    data: succeeded,
                }
            );
        }
        if (skipped.length > 0) {
            res.push(
                {
                    name: 'Skipped',
                    data: skipped,
                }
            );
        }
        if (cancelled.length > 0) {
            res.push(
                {
                    name: 'Cancelled',
                    data: cancelled,
                }
            );
        }

        return res;
    }

    private cmp(a, b) {
        if (a['y'][0] < b['y'][0]) {
            return -1;
        }
        if (a['y'][0] > b['y'][0]) {
            return 1;
        }
        return 0;
    }

    private parseActions() {
        const actions : object[] = [];      
        for (const action in this.stateFile.actionsState) {
            const curr = this.createAction(
                action, 
                this.stateFile.actionsState[action].state, 
                this.stateFile.actionsState[action].startTstmp, 
                this.stateFile.actionsState[action].duration
                );
            actions.push(curr);
        } 

        return actions;
    }

    private createAction(
        name: string, 
        state: string, 
        start: string, 
        duration: string): object {
        return {
            name: name,
            state: state,
            start: start,
            duration: duration
        }
    }
}