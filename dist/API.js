"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = void 0;
const CORS_1 = require("./CORS");
var API;
(function (API) {
    // configure express routes
    function configureRoutes(app) {
        // TODO
        app.post("/solve", CORS_1.CORS.MIDDLEWARE, (_req, res) => {
            // send an empty API result as a temporary placeholder
            res.status(200).send(APIResult.EMPTY);
        });
    }
    API.configureRoutes = configureRoutes;
})(API || (exports.API = API = {}));
var APIResult;
(function (APIResult) {
    ;
    /**
     * @class Builder class for constructing API results
     */
    class Builder {
        constructor(error) {
            this.buffer = { "error": false, "status": 200 };
            this.buffer.error = error;
        }
        setStatus(v) {
            this.buffer.status = v;
            return this;
        }
        build() {
            return this.buffer;
        }
    }
    APIResult.Builder = Builder;
    ;
    // Pre-definied API results
    APIResult.EMPTY = new Builder(false).build();
})(APIResult || (APIResult = {}));
//# sourceMappingURL=API.js.map