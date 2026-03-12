/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import "./style/main.scss";
import "sweetalert2/src/sweetalert2.scss";
import { BrowserRouter } from "react-router-dom";
import "sweetalert2/src/sweetalert2.scss";
import AppLayout from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import GoogleAuthWrapper from "./components/GoogleAuthWrapper";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleAuthWrapper>
      <AppLayout />
    </GoogleAuthWrapper>
  </Provider>
);
