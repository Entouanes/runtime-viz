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

    private generateOptions () {

    }

    public getOptions () {

    }
}