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
        var serie: object[] = [];
        const start: number = toMicro(this.stateFile.runStartTime);
        for (let i = 0; i < this.actions.length; i++) {
            serie.push(
                {
                    x: this.actions[i].name,
                    y: [
                        toMicro(this.actions[i].start) - start, 
                        toMicro(this.actions[i].start) + durationMicro(this.actions[i].duration) - start
                    ],
                    fillColor: (this.actions[i].state === 'SUCCEEDED') ? '#16a34a' : ((this.actions[i].state === 'SKIPPED') ? '#fcd34d' : '#dc2626')
                }
            )
        }
        
        serie = this.addAttemptData(serie, start);

        return serie;
    }

    private addAttemptData(serie: object, start: number) {
        return [
            {
                name: 'Run',
                data: [
                    {
                        x: 'Attempt ' + this.stateFile.attemptId + ' runtime',
                        y: [
                            toMicro(this.stateFile.attemptStartTime) - start,
                            getEndTime(serie)
                        ],
                        fillColor: '#94a3b8'
                    }
                ]
            },
            {
                name: 'Actions',
                data: serie
            }
        ]
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