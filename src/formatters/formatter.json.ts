import { error, log } from "../utils";
import { Formatter } from "./_formatter";

export class JSONFormatter extends Formatter {
    constructor(private indentSpace = 4) {
        super();
    }

    public parse<T>(data: string): T {
        try {
            return JSON.parse(data);
        } catch (err) {
            error(err);
            return "" as T;
        }
    }

    format(data: string | Buffer): string {
        return JSON.stringify(data, null, this.indentSpace);
    }
}
