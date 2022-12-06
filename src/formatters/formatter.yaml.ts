import { error, log } from "../utils";
import { Formatter } from "./_formatter";
import yaml from "yaml";

export class YAMLFormatter extends Formatter {
    constructor() {
        super();
    }

    public parse<T>(data: string): T | undefined {
        try {
            return yaml.parse(data);
        } catch (err) {
            error(err);
            return undefined;
        }
    }

    format(data: string | Buffer): string {
        return yaml.stringify(data);
    }
}
