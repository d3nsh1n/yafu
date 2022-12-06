import { WriteFileOptions } from "fs";
import fs, { PathLike } from "fs-extra";
import { isArrayBufferView } from "util/types";
import { JSONFormatter } from "./formatters/formatter.json";
import { RawFormatter } from "./formatters/formatter.raw";
import { YAMLFormatter } from "./formatters/formatter.yaml";
import { Formatter } from "./formatters/_formatter";
import { Format, FileManagerOptions } from "./lib";
import { error, warn } from "./utils";

export class File<T = string> {
    // Content
    public content: T | string = "";
    private _formatter: Formatter;

    constructor(private file: PathLike, opts?: FileManagerOptions<T>) {
        const { defaultContent, assertFn, format } = opts || {};
        this._formatter = File.FormatterMap[format || "json"];

        // Create file if it doesn't exist
        if (!fs.existsSync(file)) {
            fs.createFileSync(file.toString());
            if (defaultContent) {
                this.writeSync(this._formatter.format(defaultContent) || defaultContent);
            }
            return;
        }

        const existingContent = fs.readFileSync(file).toString();

        if (assertFn && !assertFn(existingContent)) {
            warn(`Incorrect content format in ${file}.`);
            return;
        }

        this.content = this._formatter.parse<T>(existingContent) || existingContent;
    }

    //todo make awaitable?
    public async write(data: string | NodeJS.ArrayBufferView | T, callback?: (err: NodeJS.ErrnoException) => void) {
        const isRaw = typeof data === "string" || isArrayBufferView(data);
        let dataToWrite = isRaw ? data : this._formatter.format(data);
        if (dataToWrite) {
            fs.writeFile(this.file, data, (err) => {
                if (callback) callback(err);
                this.content = isRaw ? this._formatter.parse(data.toString()) || this.content : data;
            });
        } else {
            error("Nothing to write!");
        }
    }

    public writeSync(data: string | NodeJS.ArrayBufferView | T, options?: WriteFileOptions) {
        const isRaw = typeof data === "string" || isArrayBufferView(data);
        let dataToWrite = isRaw ? data : this._formatter.format(data);
        if (dataToWrite) {
            fs.writeFileSync(this.file, dataToWrite, options);
            this.content = isRaw ? this._formatter.parse(data.toString()) || this.content : data;
        } else {
            error("Nothing to write!");
        }
    }

    private static FormatterMap: { [f in Format]: Formatter } = {
        json: new JSONFormatter(),
        yaml: new YAMLFormatter(),
        raw: new RawFormatter(),
    };
}
