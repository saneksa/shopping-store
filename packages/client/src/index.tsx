import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import { BrowserRouter, Switch } from "react-router-dom";
import { LoginRouter } from "./pages/Login/Login.router";
import { ApolloProvider } from "@apollo/react-hooks";
import { apolloClient } from "./utils/apollo";

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <Switch>
        <LoginRouter path="/login" exact={true} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root"),
);
