import cors from "cors";

export namespace CORS {
    // TODO configure
    export const CONFIG: cors.CorsOptions = {};
    export const MIDDLEWARE = cors(CONFIG);
}