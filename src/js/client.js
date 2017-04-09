
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./pages/Layout";
import admin from "./pages/admin";
import index from "./pages/index";
const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
<Route path="admin" name="admin" component={admin}></Route>
<IndexRoute component={index}></IndexRoute>

      </Route>
    </Router>,
    app);