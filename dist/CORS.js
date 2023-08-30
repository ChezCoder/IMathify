"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CORS = void 0;
const cors_1 = __importDefault(require("cors"));
var CORS;
(function (CORS) {
    // TODO configure
    CORS.CONFIG = {
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"].join(",")
    };
    CORS.MIDDLEWARE = (0, cors_1.default)(CORS.CONFIG);
})(CORS || (exports.CORS = CORS = {}));
//# sourceMappingURL=CORS.js.map