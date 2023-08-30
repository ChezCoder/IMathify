import cors from "cors";

export namespace CORS {
    // TODO configure
    export const CONFIG: cors.CorsOptions = {
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"].join(",")
    };

    export const MIDDLEWARE = cors(CONFIG);
}
