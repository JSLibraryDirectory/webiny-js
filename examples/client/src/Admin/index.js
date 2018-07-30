import React from "react";
import ReactDOM from "react-dom";
import { app } from "webiny-client";

import "./index.scss";
import App from "./app";

app.setup().then(({ store }) => {
    window.app = app;
    ReactDOM.render(<App store={store} />, document.getElementById("root"));
});
