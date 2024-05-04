import React from "react";
import { createRoot } from "react-dom/client";
import App from "app/App";
import registerServiceWorker from "./registerServiceWorker";
import "core-js";

import store from "./app/store";
import { Provider } from "react-redux";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

registerServiceWorker();
