export type Format = "json" | "yaml" | "raw";

export interface FileManagerOptions<T> {
    format?: Format;
    assertFn?: (val: any) => val is T;
    defaultContent?: T;
}
