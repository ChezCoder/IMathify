import types from "express-serve-static-core";
import { CORS } from "./CORS";

export namespace API {
    // configure express routes
    export function configureRoutes(app: types.Express) {
        // TODO
        app.post("/solve", CORS.MIDDLEWARE, (_req, res) => {
            // send an empty API result as a temporary placeholder
            res.status(200).send(APIResult.EMPTY);
        });
    }
}

namespace APIResult {
    export interface Result {
        error: boolean;
        status: number;
    };

    /**
     * @class Builder class for constructing API results
     */
    export class Builder {
        private buffer: Result = { "error": false, "status": 200 };

        constructor(error: boolean) {
            this.buffer.error = error;
        }

        public setStatus(v: number): this {
            this.buffer.status = v;
            return this;
        }

        public build(): Result {
            return this.buffer;
        }
    };

    // Pre-definied API results
    export const EMPTY: Result = new Builder(false).build();
}