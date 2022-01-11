import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UsersProvider from "./context/UsersContext";
import "./index.css";
import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={ptBR}>
      <UsersProvider>
        <App />
      </UsersProvider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
