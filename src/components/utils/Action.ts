export class Action {
    constructor(name: string, state: string, start: number, end: number, duration: number) {
        this.name = name;
        this.state = state;
        this.start = start;
        this.end = end;
        this.duration = duration;
    }

    public name: string;
    public state: string;
    public start: number;
    public end: number;
    public duration: number;

    public getAction(): object {
        return {
            name: this.name,
            start: this.start,
            end: this.end,
            duration: this.duration
        }
    }
}