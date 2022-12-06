import chalk from "chalk";

export function unboundLog(logFunc: (...arg: any[]) => void, show: boolean, context: string, color: string, ...data: any) {
    if (show) {
        const isBrowser = process.title === "browser";
        if (isBrowser) {
            logFunc(`%c[${context}] -`, `color: ${color}`, ...data);
        } else {
            logFunc(chalk.hex(color)(`[${context}] -`), ...data);
        }
    }
}

const __CONTEXT__ = "YAFU";
const LOG = true;
export const log = (...data: any) => unboundLog(console.log, LOG, __CONTEXT__, "#ffd767", ...data);
export const warn = (...data: any) => unboundLog(console.warn, LOG, __CONTEXT__, "#ffd767", ...data);
export const error = (...data: any) => unboundLog(console.error, LOG, __CONTEXT__, "#ffd767", ...data);
