"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Configuration_1 = require("./Configuration");
const API_1 = require("./API");
const PORT = Configuration_1.Configuration.readValue("PORT");
const App = (0, express_1.default)();
// - Express config - //
App.set("views", "public");
// - Body parsers - //
App.use(express_1.default.json());
App.use(express_1.default.urlencoded({ "extended": true }));
// - Static routes - //
App.use("/static", express_1.default.static("static"));
App.use("/", express_1.default.static("public/home"));
API_1.API.configureRoutes(App);
App.listen(PORT, () => {
    console.log(`Listening on :${PORT}`);
});
//# sourceMappingURL=index.js.map