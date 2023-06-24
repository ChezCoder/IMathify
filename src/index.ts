import express from "express";
import { Configuration } from "./Configuration";
import { API } from "./API";

const PORT = Configuration.readValue("PORT");
const App = express();

// - Express config - //
App.set("views", "public");

// - Body parsers - //
App.use(express.json());
App.use(express.urlencoded({ "extended": true }));

// - Static routes - //
App.use("/static", express.static("static"));
App.use("/", express.static("public/home"));

API.configureRoutes(App);

App.listen(PORT, () => {
    console.log(`Listening on :${PORT}`);
});