import { Format } from "../lib";

export abstract class Formatter {
    abstract parse<T>(data: string): T | undefined;
    abstract format(data: any): string;
}
