import { error, log } from "../utils";
import { Formatter } from "./_formatter";
import yaml from "yaml";

export class RawFormatter extends Formatter {
    constructor() {
        super();
    }

    public parse<T>(data: string): T {
        return data as T;
    }

    format(data: string | Buffer): string {
        return data.toString();
    }
}
