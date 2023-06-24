import * as fs from "fs";

// holds code for buffering the config.json file
namespace ConfigurationBuffer {
    let buffer: Record<string, any> | null = null;

    // caches reads to config file
    export function refreshBuffer(): Record<string, any> {
        if (buffer == null) {
            const buff = fs.readFileSync(Configuration.FILE, { "encoding": "utf8" });
            try {
                buffer = JSON.parse(buff);
            } catch (err) {
                if (err instanceof SyntaxError) {
                    throw new Error(`Error while parsing configuration file at ${Configuration.FILE}`);
                }
            }
        }
        return buffer || {};
    }
}

export namespace Configuration {
    // configurable config file
    export let FILE = "config.json";

    // read a key from config file with template types
    export function readValue<T>(key: string): T | null {
        const config = ConfigurationBuffer.refreshBuffer();
        return config[key] || null;
    }
}