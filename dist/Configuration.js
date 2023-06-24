"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
const fs = __importStar(require("fs"));
// holds code for buffering the config.json file
var ConfigurationBuffer;
(function (ConfigurationBuffer) {
    let buffer = null;
    // caches reads to config file
    function refreshBuffer() {
        if (buffer == null) {
            const buff = fs.readFileSync(Configuration.FILE, { "encoding": "utf8" });
            try {
                buffer = JSON.parse(buff);
            }
            catch (err) {
                if (err instanceof SyntaxError) {
                    throw new Error(`Error while parsing configuration file at ${Configuration.FILE}`);
                }
            }
        }
        return buffer || {};
    }
    ConfigurationBuffer.refreshBuffer = refreshBuffer;
})(ConfigurationBuffer || (ConfigurationBuffer = {}));
var Configuration;
(function (Configuration) {
    // configurable config file
    Configuration.FILE = "config.json";
    // read a key from config file with template types
    function readValue(key) {
        const config = ConfigurationBuffer.refreshBuffer();
        return config[key] || null;
    }
    Configuration.readValue = readValue;
})(Configuration = exports.Configuration || (exports.Configuration = {}));
//# sourceMappingURL=Configuration.js.map