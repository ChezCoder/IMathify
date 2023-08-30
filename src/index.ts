import express from "express";

import { API } from "./API";
import { Configuration } from "./Configuration";

const PORT = Configuration.readValue("PORT");
const App = express();

// - Express config - //
App.set("views", "public");

// - Body parsers - //
App.use(express.json());
App.use(express.urlencoded({ "extended": true }));

// - Static routes - //
App.use("/", express.static("public/home"));
App.use("/static", express.static("public/static"));

API.configureRoutes(App);

App.listen(PORT, () => {
    console.log(`Listening on :${PORT}`);
});